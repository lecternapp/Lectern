"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FlashcardCard from "@/app/dashboard/_components//FlashcardCard";
import QuizCard from "@/app/dashboard/_components//QuizCard";

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FlashcardCard from "@/components/FlashcardCard";
import QuizCard from "@/components/QuizCard";

export default function SummaryDetailPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/summaries/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        // ✅ Extract and format the AI-generated data
        setTitle(result.title);
        setSummary(result.summary);
        setFlashcards(result.flashcards.map(card => ({ term: card.term, definition: card.definition })));
        setQuiz(result.quiz.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
          explanation: q.explanation
        })));

      } catch (error) {
        console.error("Failed to fetch summary data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

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
      {activeTab === "summary" && <p className="text-gray-600">{summary}</p>}

      {activeTab === "flashcards" && (
        <div className="space-y-4">
          {flashcards.map((card, index) => (
            <FlashcardCard key={index} card={card} />
          ))}
        </div>
      )}

      {activeTab === "quiz" && <QuizCard quiz={quiz} />}
    </div>
  );
}
