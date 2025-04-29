'use client';

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

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const question = quiz?.[current];

  useEffect(() => {
    const loadQuiz = async () => {
      const storedLectureId = sessionStorage.getItem('quizLectureId');
      const shouldReload = !quiz?.length || lectureId !== storedLectureId;

      if (quiz?.length && lectureId === storedLectureId) {
        setLoading(false);
        return;
      }

      if (shouldReload) {
        setQuiz(null);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/quizzes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lectureId, summary }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to load quiz");

        if (data.summary && !summary) {
          setSummary(data.summary);
        }

        if (data.quizQuestions) {
          setQuiz(data.quizQuestions);
          sessionStorage.setItem('quizLectureId', lectureId);
        } else {
          throw new Error("Quiz data missing from response");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [lectureId]);

  const handleSelect = (choice) => {
    if (selected) return;

    setSelected(choice);
    setAnswers((prev) => [
      ...prev,
      { question: question.question, selected: choice, correct: question.answer },
    ]);

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

  const handleSubmitQuiz = () => {
    setFinished(true);
  };

  const handleRetake = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowNext(false);
    setFinished(false);
    setAnswers([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-gray-500 font-medium">Loading quiz...</p>
      </div>
    );
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
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Quiz: {summary?.title || `Lecture ${lectureId}`}
        </h1>
      </div>

      {!finished && question && (
        <div className="space-y-10">
          <div className="bg-white p-12 rounded-3xl shadow-xl border space-y-8">
            <div className="flex justify-between text-lg text-gray-500">
              <div>Question {current + 1} of {quiz.length}</div>
              <button
                onClick={handleSubmitQuiz}
                className="text-blue-500 hover:underline text-sm"
              >
                Submit Quiz Early
              </button>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {question.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className={`w-full text-left p-4 rounded-lg border transition-all
                    ${
                      selected
                        ? choice === question.answer
                          ? "bg-green-100 border-green-400 text-green-700"
                          : choice === selected
                          ? "bg-red-100 border-red-400 text-red-700"
                          : "border-gray-200 text-gray-800"
                        : "hover:bg-gray-100 border-gray-200 text-gray-800"
                    }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {selected && selected !== question.answer && (
              <div className="mt-4 text-red-500 font-semibold">
                Correct answer: {question.answer}
              </div>
            )}

            {showNext && (
              <div className="flex justify-end mt-6">
                <Button onClick={handleNext}>
                  {current === quiz.length - 1
                    ? "Finish Quiz"
                    : "Next Question →"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {finished && (
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            🎉 Quiz Summary
          </h2>
          <p className="text-lg text-gray-600">
            You answered {score} out of {quiz.length} correctly (
            {Math.round((score / quiz.length) * 100)}%)
          </p>

          <div className="mt-8 text-left space-y-4">
            {answers.map((entry, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  entry.selected === entry.correct
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                }`}
              >
                <div className="font-semibold">{entry.question}</div>
                <div className="text-sm">
                  Your answer: {entry.selected || "(No answer)"} <br />
                  Correct answer: {entry.correct}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button variant="outline" onClick={handleRetake}>
              Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
