"use client";
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
      // Get stored lecture ID from sessionStorage
      const storedLectureId = sessionStorage.getItem('flashcardsLectureId');
      
      // Force reload if lecture ID changed or no flashcards are available
      const shouldReload = !flashcards || lectureId !== storedLectureId;
      
      if (flashcards && lectureId === storedLectureId) {
        console.log("✅ Loaded flashcards from context for lecture:", lectureId);
        setIndex(0);
        return;
      }
      
      if (shouldReload) {
        console.log("🔄 Lecture ID changed or no flashcards data, fetching fresh flashcards");
        // Clear old flashcards
        setFlashcards(null);
      }

      console.log("📡 Calling API to fetch flashcards...");
      setGenerating(true);
      setError(null);

      try {
        const response = await fetch(`/api/flashcards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lectureId, contextSummary: summary }),
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to load flashcards");

        setFlashcards(data.flashcards);
        setRawJson(JSON.stringify(data.flashcards, null, 2));
        
        // Store the current lecture ID in sessionStorage
        sessionStorage.setItem('flashcardsLectureId', lectureId);
        console.log(`💾 Saved flashcards for lecture ID: ${lectureId}`);
        
        setIndex(0);
      } catch (err) {
        console.error("❌ Error fetching flashcards:", err);
        setError(err.message);
      } finally {
        setGenerating(false);
      }
    };

    loadFlashcards();
  }, [lectureId]); // Re-run when lectureId changes

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

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`/api/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lectureId }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Failed to generate flashcards");

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

  if (!flashcards) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Flashcards: {summary?.title || `Lecture ${lectureId}`}
        </h2>
        <p className="text-gray-500">
          You haven't generated any flashcards yet.
        </p>

        <Button
          onClick={handleGenerateFlashcards}
          variant="default"
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate Flashcards"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {rawJson && (
          <textarea
            readOnly
            className="w-full mt-4 p-3 border rounded font-mono text-sm bg-gray-50"
            rows={20}
            value={rawJson}
          />
        )}
      </div>
    );
  }

  if (current) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">
          Flashcards: {summary?.title || `Lecture ${lectureId}`}
        </h2>

        {!finished ? (
          <>
            <div
              onClick={handleFlip}
              className={`cursor-pointer bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-transform duration-300 ${
                flipped ? "rotate-[2deg] skew-y-1 bg-blue-50" : ""
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
          </>
        ) : (
          <>
            <div className="bg-white p-10 rounded-lg shadow border text-xl font-semibold text-gray-700">
              <p>{"You've reached the end of the flashcards!"}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={restart} variant="default">
                Restart Deck
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 text-center text-gray-600">Loading flashcards...</div>
  );
}
