'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const sampleQuestions = [
  {
    id: 1,
    type: 'definition',
    prompt: 'pygame.display.flip()',
    choices: [
      'pause the game for a set duration',
      'update screen to show latest drawn images',
      'clear the screen of all images',
      'initialize the graphics engine',
    ],
    answer: 'update screen to show latest drawn images',
  },
  {
    id: 2,
    type: 'term',
    prompt: 'Threshold',
    choices: [
      'a character we have doubts and suspicion on',
      'person who blocks the progress of the Hero',
      'the limit beyond which something happens',
      'emotional turning point in the plot',
    ],
    answer: 'the limit beyond which something happens',
  },
];

export default function QuizPage() {
  const { lectureId } = useParams();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = sampleQuestions[current];

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === question.answer) {
      setScore((prev) => prev + 1);
    }
    setShowNext(true);
  };

  const handleNext = () => {
    if (current < sampleQuestions.length - 1) {
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
    console.log('🔄 Regenerate new questions (placeholder)');
    // Future: fetch new question set from AI or database
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-sm text-gray-500 font-medium">
          {score} / {sampleQuestions.length}
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
                {current === sampleQuestions.length - 1 ? 'Finish Quiz' : 'Next Question →'}
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
            You scored <span className="font-semibold">{score}</span> out of{' '}
            <span className="font-semibold">{sampleQuestions.length}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleRetake}>
              Retake Quiz
            </Button>
            <Button onClick={handleRegenerate}>
              Regenerate Questions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
