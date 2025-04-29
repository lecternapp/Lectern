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

  const isFromContext = !!contextSummary;

  useEffect(() => {
    if (isFromContext) {
      setSummaryText(contextSummary.summary || '');
      setSummaryTitle(contextSummary.title || 'Summary');
      setSummaryDescription(contextSummary.description || '');
      console.log('🧠 Summary pulled from context');
      setLoading(false);
    } else if (lectureId) {
      async function fetchSummary() {
        setLoading(true);
        setError('');

        try {
          const res = await fetch(`/api/summaries/${lectureId}`);
          if (!res.ok) throw new Error('Failed to load summary');

          const data = await res.json();
          setSummaryText(data.summary || '');
          setSummaryTitle(data.title || 'Loading Summary');
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

      fetchSummary();
    }
  }, [lectureId, isFromContext, contextSummary, setSummary]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-center">
      <h2 className="text-2xl font-bold">{summaryTitle}</h2>

      {!summaryText && loading && (
        <p className="text-gray-600">Loading summary...</p>
      )}
      {!summaryText && error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {summaryText && (
        <div className="bg-white p-6 rounded-lg shadow border text-gray-800 prose max-w-none text-left">
          <ReactMarkdown className="prose max-w-none text-gray-800">
            {summaryText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
