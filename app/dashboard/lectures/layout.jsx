// app/lectures/layout.jsx
'use client';


export default function LecturesLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Main lecture content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
