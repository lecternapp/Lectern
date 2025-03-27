// app/lectures/[lectureId]/layout.jsx
import LectureToolsSidebar from './_components/LectureToolsSidebar';

export default function lectureLayout({ children }) {
  return (
    <div className="flex">
      <LectureToolsSidebar />
      <main className="ml-64 w-full p-10 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
