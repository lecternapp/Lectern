'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function SummaryPage() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('lecture-summary');
    if (stored) {
      setSummary(stored);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Generated Summary</h1>
      {summary ? (
        <div className="prose max-w-none">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-gray-500">No summary available. Please upload and process a lecture first.</p>
      )}
    </div>
  );
}
