"use client";
import { useState } from "react";

export default function QuizCard({ quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showExplanations, setShowExplanations] = useState(false);

  const handleSubmit = () => {
    let correctAnswers = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowExplanations(true);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      {quiz.map((q, index) => (
        <div key={index} className="mt-4">
          <p className="font-medium">{q.question}</p>
          {q.options.map((option) => (
            <button
              key={option}
              className={`block w-full text-left p-2 rounded-md border mt-2 ${
                selectedAnswers[index] === option ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedAnswers({ ...selectedAnswers, [index]: option })}
            >
              {option}
            </button>
          ))}
          {showExplanations && (
            <p className="mt-2 text-sm text-gray-600">
              <strong>Correct Answer:</strong> {q.correctAnswer} <br />
              <strong>Explanation:</strong> {q.explanation}
            </p>
          )}
        </div>
      ))}

      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleSubmit}>
        Submit
      </button>
      {score !== null && <p className="mt-2">Score: {score} / {quiz.length}</p>}
    </div>
  );
}
