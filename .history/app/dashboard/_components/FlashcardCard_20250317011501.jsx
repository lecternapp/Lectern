"use client";
import { useState } from "react";

export default function FlashcardCard({ card }) {
  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white text-center">
      <p className="text-lg font-medium">{showDefinition ? card.definition : card.term}</p>
      <button onClick={() => setShowDefinition(!showDefinition)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        {showDefinition ? "Show Term" : "Show Definition"}
      </button>
    </div>
  );
}
