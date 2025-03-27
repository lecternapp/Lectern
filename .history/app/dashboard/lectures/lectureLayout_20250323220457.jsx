// app/dashboard/lectures/layout.jsx
import LectureSidebar from './_components/LecturesSidebar';

export default function LecturesLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Custom Sidebar for Lecture Tools */}
      <aside className="w-64 bg-white shadow-md">
        <LectureSidebar />
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
