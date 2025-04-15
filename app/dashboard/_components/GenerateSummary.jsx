"use client";

import { useState } from "react";

export default function GenerateSummary() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateSummary = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate summary.");
            }

            setText(JSON.stringify(data.summary, null, 2));
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
                onClick={handleGenerateSummary}
                disabled={loading || !text.trim()}
            >
                {loading ? "Generating..." : "Generate Summary"}
            </button>
        </div>
    );
}
