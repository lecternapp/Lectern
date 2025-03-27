'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Summary', href: '/dashboard/summaries' },
  { name: 'Flashcards', href: '/dashboard/summaries/flashcards' },
  { name: 'Quiz', href: '/dashboard/summaries/quiz' },
];

export default function SummarySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Study Tools</h2>
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
