'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconVocabulary, IconCards, IconMessage2Question, IconArrowBack } from '@tabler/icons-react';
import { LuLectern } from 'react-icons/lu';

export default function LectureToolsSidebar() {
  const pathname = usePathname();

  // Extract dynamic [lectureId] from the pathname
  const lectureId = pathname.split('/')[1];

  const Menu = [
    {
      name: 'Summary',
      icon: <IconVocabulary />,
      path: `/${lectureId}/summary`,
    },
    {
      name: 'Flashcards',
      icon: <IconCards />,
      path: `/${lectureId}/flashcards`,
    },
    {
      name: 'Quiz',
      icon: <IconMessage2Question />,
      path: `/${lectureId}/quiz`,
    },
    {
      name: 'Back to Dashboard',
      icon: <IconArrowBack />,
      path: '/dashboard',
    },
  ];

  return (
    <div className="fixed h-full w-64 p-5 shadow-md bg-white border-r z-20">
      <div className="flex items-center mb-6">
        <LuLectern size={32} className="text-primary" />
        <span className="ml-2 text-xl font-bold text-primary">Lecture </span>
      </div>
      <hr className="mb-6" />

      <ul>
        {Menu.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${isActive ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="text-xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
