"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSummary } from "@/app/context/SummaryContext";
import { useQuizContext } from "@/app/context/QuizContext";
import { Button } from "@/components/ui/button";

export default function GenerateQuiz() {
  const { lectureId } = useParams();
  const { summary, setSummary } = useSummary();
  const { quiz, setQuiz } = useQuizContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLectureId, setCurrentLectureId] = useState(null);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quiz?.[current];

  useEffect(() => {
    // Store the current lecture ID to track changes
    setCurrentLectureId(lectureId);
    
    // Get stored lecture ID from sessionStorage
    const storedLectureId = sessionStorage.getItem('quizLectureId');
    
    const loadQuiz = async () => {
      // Force reload if lecture ID changed or no quiz is available
      const shouldReload = !quiz?.length || lectureId !== storedLectureId;
      
      if (quiz?.length && lectureId === storedLectureId) {
        console.log("✅ Quiz loaded from context for lecture:", lectureId);
        setLoading(false);
        return;
      }
      
      if (shouldReload) {
        console.log("🔄 Lecture ID changed or no quiz data, fetching fresh quiz");
        // Clear old quiz data
        setQuiz(null);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/quizzes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lectureId, summary }), // summary is optional fallback
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to load quiz");

        if (data.summary && !summary) {
          setSummary(data.summary);
        }

        if (data.quizQuestions) {
          setQuiz(data.quizQuestions);
          
          // Store the current lecture ID in sessionStorage
          sessionStorage.setItem('quizLectureId', lectureId);
          
          console.log(`💾 Saved quiz for lecture ID: ${lectureId}`);
        } else {
          throw new Error("Quiz data missing from response");
        }
      } catch (err) {
        console.error("❌ Error fetching quiz:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [lectureId]); // Re-run when lectureId changes

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === question.answer) {
      setScore((prev) => prev + 1);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowNext(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowNext(false);
    setFinished(false);
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading quiz...</div>;
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Quiz: {summary?.title || `Lecture ${lectureId}`}
        </h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!quiz?.length) {
    return (
      <div className="text-center py-10 text-gray-600">
        No questions available for this lecture.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-gray-800">
          Quiz on: {summary?.title || `Lecture ${lectureId}`}
        </h1>
      </div>

      {!finished && question && (
        <div className="space-y-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {question.question}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Choose the correct answer
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className={`w-full text-left p-4 rounded-lg border transition-all
                    ${
                      selected === choice
                        ? choice === question.answer
                          ? "bg-green-100 border-green-400 text-green-700"
                          : "bg-red-100 border-red-400 text-red-700"
                        : "hover:bg-gray-100 border-gray-200 text-gray-800"
                    }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {!selected && (
              <div className="text-center mt-4">
                <button
                  onClick={() => handleSelect("")}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Don't know?
                </button>
              </div>
            )}
          </div>

          {showNext && (
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {current === quiz.length - 1
                  ? "Finish Quiz"
                  : "Next Question →"}
              </Button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="bg-white p-8 rounded-lg shadow text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Quiz Complete!
          </h2>
          <p className="text-lg text-gray-600">
            You scored <span className="font-semibold">{score}</span> out of{" "}
            <span className="font-semibold">{quiz.length}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRetake}>
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
