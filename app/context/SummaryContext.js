'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SummaryContext = createContext();

export const useSummary = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  // Initialize state from sessionStorage if available
  const [summary, setSummary] = useState(() => {
    const storedSummary = sessionStorage.getItem('summary');
    return storedSummary ? JSON.parse(storedSummary) : null;
  });
  
  const [summaries, setSummaries] = useState(() => {
    const storedSummaries = sessionStorage.getItem('summaries');
    return storedSummaries ? JSON.parse(storedSummaries) : [];
  });
  
  const [flashcards, setFlashcards] = useState(() => {
    const storedFlashcards = sessionStorage.getItem('flashcards');
    return storedFlashcards ? JSON.parse(storedFlashcards) : null;
  });

  // Handle setting summary and updating sessionStorage
  const handleSetSummary = (newSummary) => {
    setSummary(newSummary);
    // Update summaries array if necessary
    setSummaries((prev) => {
      if (!newSummary?.id || prev.some((s) => s.id === newSummary.id)) return prev;
      const updatedSummaries = [...prev, newSummary];
      sessionStorage.setItem('summaries', JSON.stringify(updatedSummaries)); // Save to sessionStorage
      return updatedSummaries;
    });
    // Save to sessionStorage
    sessionStorage.setItem('summary', JSON.stringify(newSummary));
  };

  // Save flashcards to sessionStorage whenever it changes
  useEffect(() => {
    if (flashcards !== null) {
      sessionStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  }, [flashcards]);

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
