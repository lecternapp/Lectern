// app/lectures/[lectureId]/layout.jsx
import LectureSidebar from './_components/lecturesSidebar';

export default function LectureLayout({ children }) {
  return (
    <div className="flex">
      <LectureSidebar />
      <main className="ml-64 w-full p-10 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
