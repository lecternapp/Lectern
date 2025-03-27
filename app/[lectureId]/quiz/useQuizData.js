// app/lectures/[lectureId]/quiz/useQuizData.js
'use client';

import { useEffect, useState } from 'react';

export function useQuizData(lectureId) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      setError('');
      try {
        // 🔁 Replace with actual API call later
        const res = await fetch(`/api/quizzes/${lectureId}`);
        if (!res.ok) throw new Error('Failed to load quiz');
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [lectureId]);

  return { questions, loading, error };
}
