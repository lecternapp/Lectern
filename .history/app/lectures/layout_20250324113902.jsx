'use client';

import Header from '../dashboard/_components/Header';
import LecturesSidebar from './_components/LecturesSidebar'; // ✅ Make sure this path is correct

export default function LecturesLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r bg-white">
          <LecturesSidebar />
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
