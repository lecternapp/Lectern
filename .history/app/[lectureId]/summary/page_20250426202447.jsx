'use client';

import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useSummary } from '@/app/context/SummaryContext';
import { useEffect, useState } from 'react';

export default function SummaryPage() {
  const { lectureId } = useParams();
  const {
    summary: contextSummary,
    setSummary,
  } = useSummary();

  const [summaryText, setSummaryText] = useState('');
  const [summaryTitle, setSummaryTitle] = useState('Summary');
  const [summaryDescription, setSummaryDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isFromContext = !!contextSummary && !!contextSummary.summary;

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/summaries/${lectureId}`);
        if (!res.ok) throw new Error('Failed to load summary');

        const data = await res.json();
        setSummaryText(data.summary || '');
        setSummaryTitle(data.title || 'Summary');
        setSummaryDescription(data.description || '');

        if (data) {
          setSummary(data); // Save full object in context
          console.log('🧠 Summary fetched and stored in context');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    if (isFromContext) {
      console.log('🧠 Summary pulled from context');
      setSummaryText(contextSummary.summary || '');
      setSummaryTitle(contextSummary.title || 'Summary');
      setSummaryDescription(contextSummary.description || '');
      setLoading(false);
    } else if (lectureId) {
      fetchSummary();
    }
  }, [lectureId, isFromContext, contextSummary, setSummary]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-center">
      <h2 className="text-2xl font-bold">{summaryTitle}</h2>

      {/* Proper loading animation */}
      {loading && (
        <div className="flex justify-center items-center p-10">
          <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="ml-4 text-gray-500 font-medium">Loading summary...</p>
        </div>
      )}


      {/* Error Message */}
      {!loading && error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {/* Summary Content */}
      {!loading && summaryText && (
        <div className="bg-white p-6 rounded-lg shadow border text-gray-800 prose max-w-none text-left">
          <ReactMarkdown className="prose max-w-none text-gray-800">
            {summaryText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
