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

  const current = flashcards[index];

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleRegenerate = () => {
    console.log('🔁 Regenerating flashcards (placeholder)');
    // In the future: call an API to regenerate flashcards
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading flashcards...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!flashcards.length) return <div className="p-6 text-center text-gray-500">No flashcards found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>

      <div className="bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-all duration-300">
        {flipped ? current.definition : current.term}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleFlip} variant="outline">
          Flip
        </Button>
        <Button onClick={nextCard}>
          Next Card →
        </Button>
        <Button onClick={handleRegenerate} variant="secondary">
          Regenerate
        </Button>
      </div>

      <p className="text-sm text-gray-500">
        Card {index + 1} of {flashcards.length}
      </p>
    </div>
  );
}
