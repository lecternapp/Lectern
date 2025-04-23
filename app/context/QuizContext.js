'use client';

import { createContext, useContext, useState } from 'react';

// Create the Quiz context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null); // Holds the quiz questions

  const logSetQuiz = (data, source = 'unknown') => {
    console.log(`[QuizContext] Setting quiz from ${source}:`, data);
    setQuiz(data);
  };

  const logGetQuiz = () => {
    console.log('[QuizContext] Getting quiz from context:', quiz);
    return quiz;
  };

  return (
    <QuizContext.Provider value={{ quiz, setQuiz: logSetQuiz, getQuiz: logGetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

// Hook to use the context
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
