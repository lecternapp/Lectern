'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const navItems = [
  { name: 'Summary', slug: 'summary' },
  { name: 'Flashcards', slug: 'flashcards' },
  { name: 'Quiz', slug: 'quiz' },
];

export default function LectureToolsSidebar() {
  const { lectureId } = useParams();
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-white border-r p-6">
      <h2 className="text-xl font-bold mb-8">Lecture {lectureId}</h2>
      <ul className="space-y-4">
        {navItems.map((item) => {
          const href = `/dashboard/lectures/${lectureId}/${item.slug}`;
          const isActive = pathname.endsWith(item.slug);
          return (
            <li key={item.slug}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg font-medium transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
