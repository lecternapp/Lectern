'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSummary } from "@/app/context/SummaryContext";
import { Button } from "@/components/ui/button";

export default function FlashcardsPage() {
  const { lectureId } = useParams();
  const { flashcards, setFlashcards, summary, setSummary } = useSummary();

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [error, setError] = useState(null);

  const current = flashcards ? flashcards[index] : null;

  useEffect(() => {
    const loadFlashcards = async () => {
      const storedLectureId = sessionStorage.getItem('flashcardsLectureId');
      const shouldReload = !flashcards || lectureId !== storedLectureId;
      
      if (flashcards && lectureId === storedLectureId) {
        console.log("✅ Loaded flashcards from context for lecture:", lectureId);
        setIndex(0);
        return;
      }
      
      if (shouldReload) {
        console.log("🔄 Lecture ID changed or no flashcards data, fetching fresh flashcards");
        setFlashcards(null);
      }

      setGenerating(true);
      setError(null);

      try {
        const response = await fetch(`/api/flashcards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lectureId, contextSummary: summary }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to load flashcards");

        setFlashcards(data.flashcards);
        setRawJson(JSON.stringify(data.flashcards, null, 2));
        sessionStorage.setItem('flashcardsLectureId', lectureId);
        setIndex(0);
      } catch (err) {
        console.error("❌ Error fetching flashcards:", err);
        setError(err.message);
      } finally {
        setGenerating(false);
      }
    };

    loadFlashcards();
  }, [lectureId]);

  const nextCard = () => {
    const next = index + 1;
    if (next >= flashcards.length) {
      setFinished(true);
    } else {
      setIndex(next);
      setFlipped(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setFlipped(false);
    setFinished(false);
  };

  const handleFlip = () => setFlipped(prev => !prev);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`/api/flashcards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lectureId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate flashcards");

      setFlashcards(data.flashcards);
      setRawJson(JSON.stringify(data.flashcards, null, 2));
      setIndex(0);
      setFinished(false);
    } catch (err) {
      console.error("❌ Error generating flashcards:", err);
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  if (generating) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-4 text-gray-500 font-medium">Loading flashcards...</p>
      </div>
    );
  }

  if (!flashcards) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Flashcards: {summary?.title || `Lecture ${lectureId}`}
        </h2>
        <p className="text-gray-500">You haven't generated any flashcards yet.</p>
        <Button onClick={handleGenerateFlashcards} variant="default" disabled={generating}>
          {generating ? "Generating..." : "Generate Flashcards"}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center">
        Flashcards: {summary?.title || `Lecture ${lectureId}`}
      </h2>

      {/* Current Card View */}
      {!finished && current && (
        <div className="flex flex-col items-center space-y-6">
          <div
            onClick={handleFlip}
            className={`cursor-pointer bg-white p-10 rounded-2xl shadow-lg border text-2xl font-semibold min-h-[200px] flex items-center justify-center w-full max-w-2xl transition-all ${
              flipped ? "rotate-1 skew-y-1 bg-blue-50" : ""
            }`}
          >
            {flipped ? current.definition : current.term}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleFlip} variant="outline">
              Flip
            </Button>
            <Button onClick={nextCard}>Next Card →</Button>
          </div>

          <p className="text-sm text-gray-500">
            Card {index + 1} of {flashcards.length}
          </p>
        </div>
      )}

      {/* Finished Deck */}
      {finished && (
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white p-10 rounded-2xl shadow-lg border text-xl font-semibold text-gray-700 w-full max-w-2xl">
            You've reached the end of the flashcards!
          </div>

          <Button onClick={restart} variant="default">
            Restart Deck
          </Button>
        </div>
      )}

      {/* Terms in This Set (Full List) */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 text-center">Terms in this set ({flashcards.length})</h3>
        <div className="space-y-4">
          {flashcards.map((card, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6">
              <div className="font-semibold text-lg text-gray-800 w-1/2">{card.term}</div>
              <div className="text-gray-600 text-md w-1/2 pl-6 border-l">{card.definition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
