'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SummaryContext = createContext();

export const useSummary = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  // Main summary object and collection of summaries
  const [summary, setSummary] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [flashcards, setFlashcards] = useState(null);
  // New states for the two fields from your schema
  const [summaryTitle, setSummaryTitle] = useState('');
  const [summaryDescription, setSummaryDescription] = useState('');

  // Load initial state from sessionStorage (browser only)
  useEffect(() => {
    const storedSummary = sessionStorage.getItem('summary');
    const storedSummaries = sessionStorage.getItem('summaries');
    const storedFlashcards = sessionStorage.getItem('flashcards');
    const storedSummaryTitle = sessionStorage.getItem('summaryTitle');
    const storedSummaryDescription = sessionStorage.getItem('summaryDescription');

    if (storedSummary) setSummary(JSON.parse(storedSummary));
    if (storedSummaries) setSummaries(JSON.parse(storedSummaries));
    if (storedFlashcards) setFlashcards(JSON.parse(storedFlashcards));
    if (storedSummaryTitle) setSummaryTitle(storedSummaryTitle);
    if (storedSummaryDescription) setSummaryDescription(storedSummaryDescription);
  }, []);

  // Persist flashcards to sessionStorage whenever they change
  useEffect(() => {
    if (flashcards !== null) {
      sessionStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  }, [flashcards]);

  // Update summary along with the two fields and summaries list
  const handleSetSummary = (newSummary) => {
    setSummary(newSummary);
    sessionStorage.setItem('summary', JSON.stringify(newSummary));

    // If the new summary object contains summaryTitle and summaryDescription, update separately
    if (newSummary && typeof newSummary === 'object') {
      if (newSummary.summaryTitle !== undefined) {
        setSummaryTitle(newSummary.summaryTitle);
        sessionStorage.setItem('summaryTitle', newSummary.summaryTitle);
      }
      if (newSummary.summaryDescription !== undefined) {
        setSummaryDescription(newSummary.summaryDescription);
        sessionStorage.setItem('summaryDescription', newSummary.summaryDescription);
      }
    }

    setSummaries((prev) => {
      // Only add the new summary if it has an id and doesn't already exist in the collection
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
        summaryTitle,
        summaryDescription,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};
