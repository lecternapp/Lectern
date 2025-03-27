// app/dashboard/lectures/[lectureId]/quiz/page.jsx
'use client';
import { useParams } from 'next/navigation';

export default function QuizPage() {
  const { lectureId } = useParams();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Quiz for Lecture {lectureId}</h2>
      <p>Quiz content will go here.</p>
    </div>
  );
}
