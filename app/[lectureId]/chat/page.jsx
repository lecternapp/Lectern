'use client';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ChatPage() {
  const { lectureId } = useParams();
  const [input, setInput] = useState('');

  const handleRegenerate = () => {
    console.log('Regenerate clicked with:', input);
    // Handle the RAG logic here    
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Chat for Lecture {lectureId}</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your question or prompt..."
        className="w-full h-40 p-4 border rounded-lg text-gray-800"
      />

      <div className="text-center">
        <Button onClick={handleRegenerate}>Regenerate</Button>
      </div>
    </div>
  );
}
