// app/dashboard/lectures/layout.jsx
import LectureSidebar from './_components/LectureSidebar';

export default function LecturesLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <LectureSidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
