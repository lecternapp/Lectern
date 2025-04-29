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
import { useEffect, useState } from 'react';

export default function FlashcardsPage() {
  const { lectureId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFlashcards() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/flashcards/${lectureId}`);
        if (!res.ok) throw new Error('Failed to load flashcards');

        const data = await res.json();
        setFlashcards(data.flashcards || []);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    if (lectureId) {
      fetchFlashcards();
    }
  }, [lectureId]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center">Terms in this set ({flashcards.length})</h2>

      {loading && (
        <div className="flex justify-center items-center p-10">
          <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="ml-4 text-gray-500 font-medium">Loading flashcards...</p>
        </div>
      )}

      {!loading && error && (
        <p className="text-red-500 text-center">Error: {error}</p>
      )}

      {!loading && flashcards.length > 0 && (
        <div className="space-y-6">
          {flashcards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center min-h-[8rem] border hover:shadow-lg transition-all"
            >
              <div className="text-lg font-semibold text-gray-800 w-1/2 pr-4">
                {card.term}
              </div>
              <div className="text-lg text-gray-600 w-1/2 pl-4 border-l">
                {card.definition}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
