// app/lectures/[lectureId]/flashcards/page.jsx
'use client';
import { useParams } from 'next/navigation';

export default function FlashcardsPage() {
  const { lectureId } = useParams();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Flashcards for Lecture {lectureId}</h2>
      <p>Flashcards content will go here.</p>
    </div>
  );
}
