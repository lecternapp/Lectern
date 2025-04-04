"use client";

import { useState } from "react";

export default function Chat() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChat = async () => {
        setLoading(true);

        try {
            //  interaction with the ai with the RAG backend
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setResponse(`You entered: "${text}"`);
        } catch (err) {
            setResponse(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <textarea
                className="w-full p-2 border rounded mb-4"
                rows={4}
                placeholder="Enter your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                onClick={handleChat}
                disabled={loading || !text.trim()}
            >
                {loading ? "Thinking..." : "Regenerate"}
            </button>
            {response && (
                <div className="mt-4 p-3 border rounded bg-gray-100 whitespace-pre-wrap">
                    <strong>Response:</strong> {response}
                </div>
            )}
        </div>
    );
}
