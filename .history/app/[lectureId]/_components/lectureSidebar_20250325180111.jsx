'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkDefs = [
  { name: 'Summary', path: 'summary' },
  { name: 'Flashcards', path: 'flashcards' },
  { name: 'Quiz', path: 'quiz' },
];

export default function LectureToolsSidebar() {
  const pathname = usePathname();

  // Get dynamic [lectureId] from the current path
  const lectureId = pathname.split('/')[1]; // assumes route like /[lectureId]/summary

  return (
    <aside className="p-6 w-64 bg-white border-r min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Lecture Tools</h2>
      <ul className="space-y-4">
        {linkDefs.map(({ name, path }) => {
          const href = `/${lectureId}/${path}`;
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
