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
//             description: "List of flashcards",
//             type: SchemaType.ARRAY,
//             items: {
//                 type: SchemaType.OBJECT,
//                 properties: {
//                     term: { type: SchemaType.STRING, description: "The key term." },
//                     definition: { type: SchemaType.STRING, description: "The definition." },
//                 },
//                 required: ["term", "definition"],
//                 propertyOrdering: ["term", "definition"],
//             },
//         };

//         const model = genAI.getGenerativeModel({
//             model: "gemini-1.5-flash",
//             generationConfig: {
//                 responseMimeType: "application/json",
//                 responseSchema: schema,
//             },
//             systemInstruction: `You are a flashcard creator. Given any text, generate 20 flashcards with key terms and concise definitions.`,
//         });

//         const result = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text }] }],
//         });

//         const jsonResponse = await result.response.text();

//         return NextResponse.json({ success: true, flashcards: jsonResponse });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: error?.message || "An unexpected error occurred" }, { status: 500 });
//     }
// }

// import { NextResponse } from "next/server";
// import { db } from "@/configs/db";
// import { summaries, flashcards } from "@/configs/schema";
// import { eq } from "drizzle-orm";
// import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";import { NextResponse } from "next/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { db } from "@/configs/db";
import { summaries, flashcards as flashcardsTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    const { lectureId, contextSummary } = await req.json();

    if (!lectureId) {
      return NextResponse.json({ error: "lectureId is required" }, { status: 400 });
    }

    // ✅ 1. Try fetching existing flashcards from the database first
    const existingFlashcards = await db
      .select()
      .from(flashcardsTable)
      .where(eq(flashcardsTable.summaryId, lectureId));

    if (existingFlashcards.length) {
      console.log("✅ Found existing flashcards in DB");
      return NextResponse.json({ success: true, flashcards: existingFlashcards });
    }

    // ✅ 2. Use context summary if provided, fallback to DB
    let summaryText = contextSummary?.summary ?? null;

    if (summaryText) {
      console.log("⚡ Using summary from context");
    } else {
      console.log("📡 Fetching summary from database");
      const summaryResult = await db
        .select()
        .from(summaries)
        .where(eq(summaries.id, lectureId))
        .limit(1);

      if (!summaryResult.length) {
        return NextResponse.json({ error: "Summary not found" }, { status: 404 });
      }

      summaryText = summaryResult[0].summary ?? "";
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const schema = {
      description: "List of flashcards",
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          term: { type: SchemaType.STRING, description: "The key term." },
          definition: { type: SchemaType.STRING, description: "The definition." },
        },
        required: ["term", "definition"],
        propertyOrdering: ["term", "definition"],
      },
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      systemInstruction:
        "You are a flashcard creator. Given any text, generate 20 flashcards with key terms and concise definitions.",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: summaryText }] }],
    });

    const jsonText = await result.response.text();
    let generatedFlashcards;

    try {
      generatedFlashcards = jsonText.startsWith("{") || jsonText.startsWith("[")
        ? JSON.parse(jsonText)
        : jsonText;
    } catch (error) {
      return NextResponse.json({ error: "Error parsing generated flashcards" }, { status: 500 });
    }

    if (!Array.isArray(generatedFlashcards) || !generatedFlashcards.length) {
      return NextResponse.json({ error: "No flashcards generated" }, { status: 500 });
    }

    const flashcardInserts = generatedFlashcards.map(({ term, definition }) => ({
      id: uuidv4(),
      summaryId: lectureId,
      term,
      definition,
    }));

    await db.insert(flashcardsTable).values(flashcardInserts);
    console.log(`💾 Saved ${flashcardInserts.length} new flashcards to database`);

    return NextResponse.json({ success: true, flashcards: generatedFlashcards });

  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
