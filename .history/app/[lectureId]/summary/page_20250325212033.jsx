'use client';
import { useParams } from 'next/navigation';
import { useSummaryData } from './useSummaryData';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export default function SummaryPage() {
  const { lectureId } = useParams();
  const { summary, loading, error } = useSummaryData(lectureId);

  const handleRegenerate = () => {
    console.log('🧠 Regenerate summary (placeholder)');
    // Future: trigger AI regeneration
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Summary for Lecture {lectureId}</h2>

      {loading && <p className="text-gray-600">Loading summary...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="bg-white p-6 rounded-lg shadow border text-gray-800 prose max-w-none">
          <ReactMarkdown className="prose prose-lg max-w-none">
  {summary}
</ReactMarkdown>
        </div>
      )}

      {!loading && !error && (
        <div className="text-center">
          <Button onClick={handleRegenerate}>Regenerate Summary</Button>
        </div>
      )}
    </div>
  );
}
