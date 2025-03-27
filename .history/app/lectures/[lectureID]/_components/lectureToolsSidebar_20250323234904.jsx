'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { LuBookOpen, LuLayers3, LuListChecks } from 'react-icons/lu';

const navItems = [
  { name: 'Summary', slug: 'summary', icon: <LuBookOpen /> },
  { name: 'Flashcards', slug: 'flashcards', icon: <LuLayers3 /> },
  { name: 'Quiz', slug: 'quiz', icon: <LuListChecks /> },
];

export default function LectureToolsSidebar() {
  const { lectureId } = useParams();
  const pathname = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md bg-white border-r">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Lecture</h2>
      </div>
      <ul>
        {navItems.map((item) => {
          const href = `/lectures/${lectureId}/${item.slug}`;
          const isActive = pathname.endsWith(item.slug);

          return (
            <Link href={href} key={item.slug}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer rounded-lg mb-3 transition-all
                ${isActive ? 'bg-gray-100 text-black' : 'hover:bg-gray-100 hover:text-black'}`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2 className="text-md font-medium">{item.name}</h2>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
