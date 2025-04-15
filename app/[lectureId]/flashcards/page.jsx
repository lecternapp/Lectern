'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFlashcardsData } from './useFlashcardsData';
import { Button } from '@/components/ui/button';

export default function FlashcardsPage() {
  const { lectureId } = useParams();
  const { flashcards, loading, error } = useFlashcardsData(lectureId);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = flashcards[index];

  const nextCard = () => {
    const next = index + 1;
    if (next >= flashcards.length) {
      setFinished(true);
    } else {
      setIndex(next);
      setFlipped(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setFlipped(false);
    setFinished(false);
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleRegenerate = () => {
    console.log('🔁 Regenerating flashcards (placeholder)');
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading flashcards...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!flashcards.length) return <div className="p-6 text-center text-gray-500">No flashcards found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>

      {!finished ? (
        <>
          <div
            onClick={handleFlip}
            className={`cursor-pointer bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-transform duration-300 ${
              flipped ? 'rotate-[2deg] skew-y-1 bg-blue-50' : ''
            }`}
          >
            {flipped ? current.definition : current.term}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleFlip} variant="outline">
              Flip
            </Button>
            <Button onClick={nextCard}>Next Card →</Button>
          </div>

          <p className="text-sm text-gray-500">
            Card {index + 1} of {flashcards.length}
          </p>
        </>
      ) : (
        <>
          <div className="bg-white p-10 rounded-lg shadow border text-xl font-semibold text-gray-700">
          <p>{"You&apos;ve reached the end of the flashcards!"}</p>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={restart} variant="default">
              Restart Deck
            </Button>
            <Button onClick={handleRegenerate} variant="secondary">
              Regenerate Flashcards
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
