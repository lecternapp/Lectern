// app/dashboard/lectures/[lectureId]/summary/page.jsx
'use client';
import { useParams } from 'next/navigation';

export default function SummaryPage() {
  const { lectureId } = useParams();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Summary for Lecture {lectureId}</h2>
      <p>This is where the AI-generated summary will go.</p>
    </div>
  );
}
