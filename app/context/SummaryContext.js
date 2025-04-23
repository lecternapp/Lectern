'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SummaryContext = createContext();

export const useSummary = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [flashcards, setFlashcards] = useState(null);

  // Initialize from sessionStorage (only runs in browser)
  useEffect(() => {
    const storedSummary = sessionStorage.getItem('summary');
    const storedSummaries = sessionStorage.getItem('summaries');
    const storedFlashcards = sessionStorage.getItem('flashcards');

    if (storedSummary) setSummary(JSON.parse(storedSummary));
    if (storedSummaries) setSummaries(JSON.parse(storedSummaries));
    if (storedFlashcards) setFlashcards(JSON.parse(storedFlashcards));
  }, []);

  // Save flashcards to sessionStorage whenever they change
  useEffect(() => {
    if (flashcards !== null) {
      sessionStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  }, [flashcards]);

  const handleSetSummary = (newSummary) => {
    setSummary(newSummary);
    sessionStorage.setItem('summary', JSON.stringify(newSummary));

    setSummaries((prev) => {
      if (!newSummary?.id || prev.some((s) => s.id === newSummary.id)) return prev;
      const updated = [...prev, newSummary];
      sessionStorage.setItem('summaries', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SummaryContext.Provider
      value={{
        summary,
        setSummary: handleSetSummary,
        summaries,
        setSummaries,
        flashcards,
        setFlashcards,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
