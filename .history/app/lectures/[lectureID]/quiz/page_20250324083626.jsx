'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuizData } from './useQuizData';

export default function QuizPage() {
  const { lectureId } = useParams();
  const { questions, loading, error } = useQuizData(lectureId);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === question.answer) {
      setScore((prev) => prev + 1);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
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

  const handleRegenerate = () => {
    console.log('🔁 Regenerate Questions – Coming soon');
  };

  // ✅ Render loading / error states
  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading quiz...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load quiz: {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center py-10 text-gray-600">
        No questions available for this lecture.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-sm text-gray-500 font-medium">
          {score} / {questions.length}
        </h2>
        <h1 className="text-xl font-semibold text-gray-800">
          CPSC 366 Midterm — Lecture {lectureId}
        </h1>
      </div>

      {!finished && (
        <div className="space-y-10">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500 mb-2">
              {question.type === 'definition' ? 'Definition' : 'Term'}
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {question.prompt}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Choose matching {question.type === 'definition' ? 'term' : 'definition'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className={`w-full text-left p-4 rounded-lg border transition-all
                    ${
                      selected === choice
                        ? choice === question.answer
                          ? 'bg-green-100 border-green-400 text-green-700'
                          : 'bg-red-100 border-red-400 text-red-700'
                        : 'hover:bg-gray-100 border-gray-200 text-gray-800'
                    }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            {!selected && (
              <div className="text-center mt-4">
                <button
                  onClick={() => handleSelect('')}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Don’t know?
                </button>
              </div>
            )}
          </div>

          {showNext && (
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {current === questions.length - 1 ? 'Finish Quiz' : 'Next Question →'}
              </Button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="bg-white p-8 rounded-lg shadow text-center space-y-6">
          <h2 className="
