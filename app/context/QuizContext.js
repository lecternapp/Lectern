'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the Quiz context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  // Initialize quiz state from sessionStorage if available
  const [quiz, setQuiz] = useState(() => {
    const storedQuiz = sessionStorage.getItem('quiz');
    return storedQuiz ? JSON.parse(storedQuiz) : null;
  });

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

  // Save quiz to sessionStorage whenever it changes
  useEffect(() => {
    if (quiz !== null) {
      sessionStorage.setItem('quiz', JSON.stringify(quiz));
    }
  }, [quiz]);

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
