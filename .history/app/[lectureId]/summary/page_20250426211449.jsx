// 'use client';
// import { useParams } from 'next/navigation';
// import { useSummaryData } from './useSummaryData';
// import { Button } from '@/components/ui/button';
// import ReactMarkdown from 'react-markdown';

// export default function SummaryPage() {
//   const { lectureId } = useParams();
//   const { summary, loading, error } = useSummaryData(lectureId);

//   const handleRegenerate = () => {
//     console.log('🧠 Regenerate summary (placeholder)');
//     // Future: trigger AI regeneration
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">Summary for Lecture {lectureId}</h2>

//       {loading && <p className="text-gray-600">Loading summary...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {!loading && !error && (
//         <div className="bg-white p-6 rounded-lg shadow border text-gray-800 prose max-w-none">
//           <ReactMarkdown className="prose max-w-none text-gray-800">
//           {summary}
//         </ReactMarkdown>
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="text-center">
//           <Button onClick={handleRegenerate}>Regenerate Summary</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Jahn: I remmoved the regenerate button function cuz i feel like its not necessary.
// 'use client';
// import { useParams } from 'next/navigation';
// import ReactMarkdown from 'react-markdown';
// import { useSummary } from '@/app/context/SummaryContext';
// import { useEffect, useState } from 'react';

// export default function SummaryPage() {
//   const { lectureId } = useParams();
//   const { summary: contextSummary, setSummary } = useSummary();

//   const [summary, setSummaryState] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const isFromContext = !!contextSummary;

//   // Fetch summary directly in useEffect if it's not in context
//   useEffect(() => {
//     if (isFromContext) {
//       setSummaryState(contextSummary);
//       console.log('🧠 Summary pulled from context');
//     } else if (lectureId) {
//       async function fetchSummary() {
//         setLoading(true);
//         setError('');

//         try {
//           const res = await fetch(`/api/summaries/${lectureId}`);
//           if (!res.ok) throw new Error('Failed to load summary');

//           const data = await res.json();
//           setSummaryState(data.summary || '');
//           if (data.summary) {
//             setSummary(data.summary); // Update context with fetched summary
//             console.log('🧠 Summary fetched and stored in context');
//           }
//         } catch (err) {
//           setError(err.message || 'Something went wrong');
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchSummary();
//     }
//   }, [lectureId, isFromContext, contextSummary, setSummary]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6 text-center">
//       <h2 className="text-2xl font-bold">Summary</h2>

//       {!summary && loading && (
//         <p className="text-gray-600">Loading summary...</p>
//       )}
//       {!summary && error && (
//         <p className="text-red-500">Error: {error}</p>
//       )}

//       {summary && (
//         <div className="bg-white p-6 rounded-lg shadow border text-gray-800 prose max-w-none text-left">
//           <ReactMarkdown className="prose max-w-none text-gray-800">
//             {summary}
//           </ReactMarkdown>
//         </div>
//       )}
//     </div>
//   );
// }
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
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{summaryTitle}</h2>
        {summaryDescription && (
          <p className="text-md text-gray-500 mt-2">{summaryDescription}</p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center p-10">
          <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="ml-4 text-gray-500 font-medium">Loading summary...</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow text-center">
          Error: {error}
        </div>
      )}

      {!loading && summaryText && (
        <div className="bg-white p-10 rounded-3xl shadow-xl border text-gray-800 prose max-w-none text-left">
          <ReactMarkdown className="prose max-w-none text-gray-800">
            {summaryText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
