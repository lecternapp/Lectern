// app/dashboard/lectures/[lectureId]/layout.jsx
'use client';

import LectureToolsSidebar from './_components/LectureToolsSidebar';

export default function LectureLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <LectureToolsSidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
