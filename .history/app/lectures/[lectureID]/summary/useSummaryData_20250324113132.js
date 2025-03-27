'use client';

import { useEffect, useState } from 'react';

export function useSummaryData(lectureId) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/summaries/${lectureId}`);
        if (!res.ok) throw new Error('Failed to load summary');

        const data = await res.json();
        setSummary(data.summary || '');
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    if (lectureId) {
      fetchSummary();
    }
  }, [lectureId]);

  return { summary, loading, error };
}
