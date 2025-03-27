
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FlashcardCard from "@/components/FlashcardCard";
import QuizCard from "@/components/QuizCard";

export default function SummaryDetailPage() {
  const { id } = useParams(); // ✅ Get dynamic ID from URL
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  const mockData = {
    1: {
      title: "Introduction to Physics",
      summary: "Newton's laws, motion, and gravity...",
      flashcards: [
        { question: "What is Newton's first law?", answer: "An object in motion stays in motion..." },
      ],
      quiz: [
        { question: "What is acceleration?", options: ["Speed", "Velocity", "Rate of change"], correct: "Rate of change" },
      ],
    },
  };

  useEffect(() => {
    if (mockData[id]) {
      setData(mockData[id]);
    }
  }, [id]);

  if (!data) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab("summary")} className={`px-4 py-2 rounded ${activeTab === "summary" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Summary
        </button>
        <button onClick={() => setActiveTab("flashcards")} className={`px-4 py-2 rounded ${activeTab === "flashcards" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Flashcards
        </button>
        <button onClick={() => setActiveTab("quiz")} className={`px-4 py-2 rounded ${activeTab === "quiz" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Quiz
        </button>
      </div>

      {activeTab === "summary" && <p className="text-gray-600">{data.summary}</p>}
      {activeTab === "flashcards" && data.flashcards.map((card, index) => <FlashcardCard key={index} card={card} />)}
      {activeTab === "quiz" && <QuizCard quiz={data.quiz} />}
    </div>
  );
}
