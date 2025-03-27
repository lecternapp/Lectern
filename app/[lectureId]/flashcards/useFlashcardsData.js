'use client';

import { useEffect, useState } from 'react';

export function useFlashcardsData(lectureId) {
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

  return { flashcards, loading, error };
}
