import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(req) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key is missing" }, { status: 500 });
        }

        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
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
            systemInstruction: `You are a flashcard creator. Given any text, generate 20 flashcards with key terms and concise definitions.`,
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text }] }],
        });

        const jsonResponse = await result.response.text();

        return NextResponse.json({ success: true, flashcards: jsonResponse });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error?.message || "An unexpected error occurred" }, { status: 500 });
    }
}
