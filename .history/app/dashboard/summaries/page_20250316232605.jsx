import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layout";
import { Button } from "@/components/ui/button";
import SummaryCard from "@/components/SummaryCard";
import FlashcardCard from "@/components/FlashcardCard";
import QuizCard from "@/components/QuizCard";

const mockSummaries = [
  {
    id: 1,
    title: "Introduction to Physics",
    summary: "This lecture covered Newton's laws, motion, and gravity...",
  },
  {
    id: 2,
    title: "World War II Overview",
    summary: "We explored the causes and consequences of World War II...",
  },
];

const mockFlashcards = [
  {
    id: 1,
    topic: "Physics Laws",
    cards: [
      { question: "What is Newton's first law?", answer: "An object in motion stays in motion..." },
      { question: "What is gravity?", answer: "Gravity is a force that attracts two bodies..." },
    ],
  },
];

const mockQuizzes = [
  {
    id: 1,
    topic: "Physics Basics",
    questions: [
      { question: "What is acceleration?", options: ["Speed", "Velocity", "Rate of change"], correct: "Rate of change" },
    ],
  },
];

export default function SummariesPage() {
  const [summaries, setSummaries] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState("summaries");

  useEffect(() => {
    // Simulate fetching data
    setSummaries(mockSummaries);
    setFlashcards(mockFlashcards);
    setQuizzes(mockQuizzes);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">My Study Materials</h1>

        <div className="flex space-x-4 mb-6">
          <Button variant={activeTab === "summaries" ? "default" : "outline"} onClick={() => setActiveTab("summaries")}>
            Summaries
          </Button>
          <Button variant={activeTab === "flashcards" ? "default" : "outline"} onClick={() => setActiveTab("flashcards")}>
            Flashcards
          </Button>
          <Button variant={activeTab === "quizzes" ? "default" : "outline"} onClick={() => setActiveTab("quizzes")}>
            Quizzes
          </Button>
        </div>

        {/* Display Summaries */}
        {activeTab === "summaries" && (
          <div className="space-y-4">
            {summaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        )}

        {/* Display Flashcards */}
        {activeTab === "flashcards" && (
          <div className="space-y-4">
            {flashcards.map((set) => (
              <FlashcardCard key={set.id} flashcardSet={set} />
            ))}
          </div>
        )}

        {/* Display Quizzes */}
        {activeTab === "quizzes" && (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
