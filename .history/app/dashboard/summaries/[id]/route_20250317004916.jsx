import { NextResponse } from "next/server";

// Simulated database of AI-generated content
const summariesDB = {
  1: {
    title: "Machine Learning Basics",
    summary: "This lecture covers the fundamentals of machine learning...",
    quiz: [
      {
        question: "What is the primary purpose of machine learning?",
        options: [
          "To manually program all behaviors",
          "To enable computers to learn from data",
          "To improve hardware efficiency",
          "To replace all human decision-making"
        ],
        answer: "To enable computers to learn from data",
        explanation: "Machine learning allows computers to learn patterns from data."
      }
    ],
    flashcards: [
      { term: "Supervised Learning", definition: "A type of machine learning where models are trained using labeled data to predict outcomes." }
    ]
  }
};

export async function GET(req, { params }) {
  const { id } = params;
  const summaryData = summariesDB[id];

  if (!summaryData) {
    return NextResponse.json({ error: "Summary not found" }, { status: 404 });
  }

  return NextResponse.json(summaryData);
}
