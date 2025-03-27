"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FlashcardCard from "@/components/FlashcardCard";
import QuizCard from "/QuizCard";

export default function SummaryDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    // Fetch AI-generated content from backend API
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/summaries/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch summary data:", error);
      }
    };

    fetchData();
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

      {/* Display Content Based on Active Tab */}
      {activeTab === "summary" && <p className="text-gray-600">{data.summary}</p>}

      {activeTab === "flashcards" && (
        <div className="space-y-4">
          {data.flashcards.map((card, index) => (
            <FlashcardCard key={index} card={card} />
          ))}
        </div>
      )}

      {activeTab === "quiz" && <QuizCard quiz={data.quiz} />}
    </div>
  );
}
