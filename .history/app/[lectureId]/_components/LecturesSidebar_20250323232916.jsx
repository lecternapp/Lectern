'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Upload Lecture', href: '/lectures' },
  { name: 'Summary', href: '/lectures/summary' },
  { name: 'Flashcards', href: '/lectures/flashcards' },
  { name: 'Quiz', href: '/lectures/quiz' },
];

export default function LectureSidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-6">
      <h2 className="text-2xl font-bold mb-6">Lecture Tools</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-4 py-2 rounded-lg ${
                pathname === link.href
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
