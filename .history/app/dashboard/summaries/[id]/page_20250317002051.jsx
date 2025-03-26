"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FlashcardCard from "@/app/dashboard/_components//FlashcardCard";
import QuizCard from "@/components/QuizCard";

const mockData = {
  1: {
    title: "Introduction to Physics",
    summary: "This lecture covered Newton's laws, motion, and gravity...",
    flashcards: [
      { question: "What is Newton's first law?", answer: "An object in motion stays in motion..." },
      { question: "What is gravity?", answer: "Gravity is a force that attracts two bodies..." },
    ],
    quiz: [
      { question: "What is acceleration?", options: ["Speed", "Velocity", "Rate of change"], correct: "Rate of change" },
    ],
  },
  2: {
    title: "World War II Overview",
    summary: "We explored the causes and consequences of World War II...",
    flashcards: [
      { question: "When did World War II start?", answer: "1939" },
      { question: "Who were the Allied Powers?", answer: "USA, UK, USSR, France, and others" },
    ],
    quiz: [
      { question: "Who was the leader of Germany during WWII?", options: ["Hitler", "Stalin", "Churchill"], correct: "Hitler" },
    ],
  },
};

export default function SummaryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    if (mockData[id]) {
      setData(mockData[id]);
    }
  }, [id]);

  if (!data) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {/* Navigation Tabs */}
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

      {/* Content Sections */}
      {activeTab === "summary" && (
        <div className="border p-4 rounded-lg shadow bg-white">
          <p className="text-gray-600">{data.summary}</p>
        </div>
      )}

      {activeTab === "flashcards" && (
        <div className="space-y-4">
          {data.flashcards.map((card, index) => (
            <FlashcardCard key={index} card={card} />
          ))}
        </div>
      )}

      {activeTab === "quiz" && (
        <QuizCard quiz={data.quiz} />
      )}
    </div>
  );
}
