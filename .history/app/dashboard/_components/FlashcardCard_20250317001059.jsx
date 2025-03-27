"use client";
import { useState } from "react";

export default function FlashcardCard({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white text-center">
      <p className="text-lg font-medium">{showAnswer ? card.answer : card.question}</p>
      <button onClick={() => setShowAnswer(!showAnswer)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        {showAnswer ? "Show Question" : "Show Answer"}
      </button>
    </div>
  );
}
