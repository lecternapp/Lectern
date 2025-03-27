// app/api/quizzes/[lectureId]/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(req, { params }) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const { text } = await req.json();
    const { lectureId } = params;

    if (!text || !lectureId) {
      return NextResponse.json({ error: "Missing lectureId or text" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const schema = {
      description: "List of quiz questions",
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING, description: "The quiz question." },
          options: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Multiple-choice answer options.",
          },
          answer: { type: SchemaType.STRING, description: "The correct answer." },
          explanation: { type: SchemaType.STRING, description: "Explanation for the correct answer." },
        },
        required: ["question", "options", "answer", "explanation"],
        propertyOrdering: ["question", "options", "answer", "explanation"],
      },
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      systemInstruction: `You are a quiz creator. Given any text, generate 20 multiple-choice quiz questions with:
        - Four answer options per question
        - One correct answer
        - A brief explanation for the correct answer`,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text }] }],
    });

    const jsonText = await result.response.text();
    const quiz = JSON.parse(jsonText);

    return NextResponse.json({ success: true, lectureId, quiz });

  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
