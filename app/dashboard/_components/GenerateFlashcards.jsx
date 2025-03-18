"use client";

import { useState } from "react";

export default function GenerateFlashcards() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateFlashcards = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/flashcards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate flashcards.");
            }

            // Replace input text with JSON response
            setText(JSON.stringify(data.flashcards, null, 2));
        } catch (err) {
            setText(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <textarea
                className="w-full p-2 border rounded mb-4"
                rows={4}
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                onClick={handleGenerateFlashcards}
                disabled={loading || !text.trim()}
            >
                {loading ? "Generating..." : "Generate Flashcards"}
            </button>
        </div>
    );
}
