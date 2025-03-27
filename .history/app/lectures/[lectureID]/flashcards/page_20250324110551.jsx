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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading flashcards...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!flashcards.length) return <div className="p-6 text-center text-gray-500">No flashcards found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>

      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-transform duration-300 hover:rotate-1"
      >
        {flipped ? current.definition : current.term}
      </div>

      <Button onClick={nextCard} variant="default" className="w-full">
        Next Card →
      </Button>

      <p className="text-sm text-gray-500">
        Card {index + 1} of {flashcards.length}
      </p>
    </div>
  );
}
