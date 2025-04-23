'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the Quiz context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);

  // Initialize quiz state from sessionStorage if available (on client side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedQuiz = sessionStorage.getItem('quiz');
      if (storedQuiz) {
        setQuiz(JSON.parse(storedQuiz));
      }
    }
  }, []); // This effect runs once, after the component mounts (client-side only)

  // Log function to set the quiz
  const logSetQuiz = (data, source = 'unknown') => {
    console.log(`[QuizContext] Setting quiz from ${source}:`, data);
    setQuiz(data);
  };

  // Log function to get the quiz
  const logGetQuiz = () => {
    console.log('[QuizContext] Getting quiz from context:', quiz);
    return quiz;
  };

  // Save quiz to sessionStorage whenever it changes (on client side only)
  useEffect(() => {
    if (quiz !== null && typeof window !== 'undefined') {
      sessionStorage.setItem('quiz', JSON.stringify(quiz));
    }
  }, [quiz]); // This effect runs when quiz state changes

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
