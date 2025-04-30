// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// export async function POST(req) {
//     try {
//         const apiKey = process.env.GEMINI_API_KEY;

//         if (!apiKey) {
//             return NextResponse.json({ error: "API key is missing" }, { status: 500 });
//         }

//         const { text } = await req.json();

//         if (!text) {
//             return NextResponse.json({ error: "No text provided" }, { status: 400 });
//         }

//         const genAI = new GoogleGenerativeAI(apiKey);

//         const schema = {
//             description: "List of quiz questions",
//             type: SchemaType.ARRAY,
//             items: {
//                 type: SchemaType.OBJECT,
//                 properties: {
//                     question: { type: SchemaType.STRING, description: "The quiz question." },
//                     options: {
//                         type: SchemaType.ARRAY,
//                         items: { type: SchemaType.STRING },
//                         description: "Multiple-choice answer options.",
//                     },
//                     answer: { type: SchemaType.STRING, description: "The correct answer." },
//                     explanation: { type: SchemaType.STRING, description: "Explanation for the correct answer." }
//                 },
//                 required: ["question", "options", "answer", "explanation"],
//                 propertyOrdering: ["question", "options", "answer", "explanation"],
//             },
//         };

//         const model = genAI.getGenerativeModel({
//             model: "gemini-1.5-flash",
//             generationConfig: {
//                 responseMimeType: "application/json",
//                 responseSchema: schema,
//             },
//             systemInstruction: `You are a quiz creator. Given any text, generate 20 multiple-choice quiz questions with:
//                 - Four answer options per question
//                 - One correct answer
//                 - A brief explanation for the correct answer`,
//         });

//         const result = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text }] }],
//         });

//         const jsonResponse = await result.response.text();

//         return NextResponse.json({ success: true, quiz: jsonResponse });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: error?.message || "An unexpected error occurred" }, { status: 500 });
//     }
// }
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { db } from '@/configs/db';
import { summaries, quizQuestions as quizQuestionsTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const { lectureId, contextSummary } = await req.json();

    if (!lectureId) {
      return NextResponse.json({ error: 'lectureId is required' }, { status: 400 });
    }

    // Check DB for existing quiz questions
    const existingQuestions = await db
      .select()
      .from(quizQuestionsTable)
      .where(eq(quizQuestionsTable.summaryId, lectureId));

    if (existingQuestions.length) {
      console.log('✅ Found existing quiz questions in DB');
      return NextResponse.json({ success: true, quizQuestions: existingQuestions });
    }

    // Use provided context summary or fallback to DB
    let summaryText = contextSummary?.summary ?? null;
    if (!summaryText) {
      const summaryResult = await db
        .select()
        .from(summaries)
        .where(eq(summaries.id, lectureId))
        .limit(1);

      if (!summaryResult.length) {
        return NextResponse.json({ error: 'Summary not found' }, { status: 404 });
      }

      summaryText = summaryResult[0].summary ?? '';
    }

    // Truncate summary text if it's too long (to prevent timeouts)
    if (summaryText && summaryText.length > 10000) {
      console.log('⚠️ Truncating long summary text to prevent timeouts');
      summaryText = summaryText.substring(0, 10000) + '...';
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const schema = {
      description: 'List of multiple-choice quiz questions',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          options: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          answer: { type: SchemaType.STRING },
        },
        required: ['question', 'options', 'answer'],
        propertyOrdering: ['question', 'options', 'answer'],
      },
    };

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
      systemInstruction:
        'You are a quiz creator. Generate 15 multiple-choice questions with 4 options each. Include the correct answer explicitly in the answer field.',
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: summaryText }] }],
    });

    const jsonText = await result.response.text();
    let generatedQuestions;

    try {
      generatedQuestions = jsonText.startsWith('{') || jsonText.startsWith('[')
        ? JSON.parse(jsonText)
        : jsonText;
    } catch (error) {
      return NextResponse.json({ error: 'Error parsing generated quiz' }, { status: 500 });
    }

    if (!Array.isArray(generatedQuestions) || !generatedQuestions.length) {
      return NextResponse.json({ error: 'No quiz questions generated' }, { status: 500 });
    }

    const validQuizInserts = generatedQuestions
      .filter(
        (q) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          q.answer &&
          q.options.includes(q.answer)
      )
      .map(({ question, options, answer }) => ({
        id: uuidv4(),
        summaryId: lectureId,
        question,
        options,
        answer,
      }));

    if (!validQuizInserts.length) {
      return NextResponse.json({ error: 'No valid quiz questions generated' }, { status: 500 });
    }

    await db.insert(quizQuestionsTable).values(validQuizInserts);
    console.log(`💾 Saved ${validQuizInserts.length} quiz questions to DB`);

    return NextResponse.json({ success: true, quizQuestions: validQuizInserts });
  } catch (error) {
    console.error('❌ Quiz generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
