const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");
  
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
  
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    },
});

export const GenerateContent_AI = {
    sendMessage: async ({ text }) => {
        try {
            const result = await model.generateContent([text]);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("AI Generation error:", error);
            throw error;
        }
    }
};
  
