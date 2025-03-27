// app/lectures/[lectureId]/layout.jsx
'use client';

import Header from '../../dashboard/_components/Header';
import LectureToolsSidebar from './_components/LectureToolsSidebar';

export default function LectureLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <LectureToolsSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
