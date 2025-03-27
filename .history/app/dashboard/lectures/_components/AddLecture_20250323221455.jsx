'use client';
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
const [summary, setSummary] = useState('');

const router = useRouter();

const GenerateContent = async () => {
  try {
    setLoading(true);
    const USER_TRANSCRIPT = parsedText || transcription;

    if (!USER_TRANSCRIPT) {
      setError('No content available to generate summary');
      return;
    }

    const prompt = `Analyze this lecture content and provide a detailed summary:

    ${USER_TRANSCRIPT.slice(0, 30000)}

    Format your response with:
    - Main topics covered
    - Key points
    - Important concepts`;

    const result = await GenerateContent.sendMessage({
      text: prompt
    });

    if (!result) {
      throw new Error('No response received from AI');
    }

    // Store summary in localStorage and route to summary page
    localStorage.setItem('lecture-summary', result);
    router.push('/dashboard/lectures/summary');
  } catch (err) {
    console.error('Generation error:', err);
    setError('Failed to generate content. Please try again.');
  } finally {
    setLoading(false);
  }
};
