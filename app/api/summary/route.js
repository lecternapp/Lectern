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
            description: "Structured summary with topics and content",
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    topic: { type: SchemaType.STRING, description: "The title of the section." },
                    content: { type: SchemaType.STRING, description: "The summarized details for this topic." }
                },
                required: ["topic", "content"],
                propertyOrdering: ["topic", "content"],
            },
        };

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
            systemInstruction: `Summarize the given text into structured sections.
             - The summary should be broken into at least two sections: 
               1. "Overview" (general summary)
               2. "Key Terms" (important terms explained concisely)
             - If additional topics are needed, include them.
             - Keep the summaries concise but informative.
             - Avoid unnecessary repetition but include key details.`,
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text }] }],
        });

        const jsonResponse = await result.response.text();

        return NextResponse.json({ success: true, summary: jsonResponse });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error?.message || "An unexpected error occurred" }, { status: 500 });
    }
}
