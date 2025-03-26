// app/dashboard/lectures/[lectureId]/layout.jsx
'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function LectureLayout({ children }) {
  const { lectureId } = useParams();
  const pathname = usePathname();

  const tabs = [
    { name: 'Summary', path: 'summary' },
    { name: 'Flashcards', path: 'flashcards' },
    { name: 'Quiz', path: 'quiz' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lecture {lectureId}</h1>
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={`/dashboard/lectures/${lectureId}/${tab.path}`}
            className={`px-4 py-2 rounded-lg ${
              pathname.endsWith(tab.path)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
