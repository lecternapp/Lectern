// 'use client';
// import { createContext, useContext, useState } from 'react';

// const SummaryContext = createContext();

// export const useSummary = () => useContext(SummaryContext);

// export const SummaryProvider = ({ children }) => {
//   const [summary, setSummary] = useState(null);

//   return (
//     <SummaryContext.Provider value={{ summary, setSummary }}>
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// iteration with flashcards:
'use client';
import { createContext, useContext, useState } from 'react';

const SummaryContext = createContext();

export const useSummary = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  const [summary, setSummary] = useState(null); // current/active summary
  const [summaries, setSummaries] = useState([]); // all summaries
  const [flashcards, setFlashcards] = useState(null);

  // Optionally add to summaries when setting the active summary
  const handleSetSummary = (newSummary) => {
    setSummary(newSummary);

    // Avoid duplicates
    setSummaries((prev) => {
      if (!newSummary?.id || prev.some((s) => s.id === newSummary.id)) return prev;
      return [...prev, newSummary];
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
