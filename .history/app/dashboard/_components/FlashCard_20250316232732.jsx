import React, { useState } from "react";

export default function FlashcardCard({ flashcardSet }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcardSet.cards.length);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white text-center">
      <h2 className="text-xl font-semibold">{flashcardSet.topic}</h2>
      <div className="mt-4">
        <p className="text-gray-700">
          {showAnswer ? flashcardSet.cards[currentIndex].answer : flashcardSet.cards[currentIndex].question}
        </p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
      </div>
      <button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
