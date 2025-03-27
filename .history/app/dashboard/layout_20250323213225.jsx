// app/dashboard/summaries/layout.jsx
import React from 'react';
import SummarySidebar from './_components/SummarySidebar';

export default function SummariesLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SummarySidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
