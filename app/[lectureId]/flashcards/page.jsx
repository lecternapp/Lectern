// 'use client';
// import { useParams } from 'next/navigation';
// import { useState } from 'react';
// import { useFlashcardsData } from './useFlashcardsData';
// import { Button } from '@/components/ui/button';

// export default function FlashcardsPage() {
//   const { lectureId } = useParams();
//   const { flashcards, loading, error } = useFlashcardsData(lectureId);

//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);
//   const [finished, setFinished] = useState(false);

//   const current = flashcards[index];

//   const nextCard = () => {
//     const next = index + 1;
//     if (next >= flashcards.length) {
//       setFinished(true);
//     } else {
//       setIndex(next);
//       setFlipped(false);
//     }
//   };

//   const restart = () => {
//     setIndex(0);
//     setFlipped(false);
//     setFinished(false);
//   };

//   const handleFlip = () => {
//     setFlipped((prev) => !prev);
//   };

//   const handleRegenerate = () => {
//     console.log('🔁 Regenerating flashcards (placeholder)');
//   };

//   if (loading) return <div className="p-6 text-center text-gray-600">Loading flashcards...</div>;
//   if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
//   if (!flashcards.length) return <div className="p-6 text-center text-gray-500">No flashcards found.</div>;

//   return (
//     <div className="p-6 max-w-xl mx-auto text-center space-y-6">
//       <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>

//       {!finished ? (
//         <>
//           <div
//             onClick={handleFlip}
//             className={`cursor-pointer bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-transform duration-300 ${
//               flipped ? 'rotate-[2deg] skew-y-1 bg-blue-50' : ''
//             }`}
//           >
//             {flipped ? current.definition : current.term}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button onClick={handleFlip} variant="outline">
//               Flip
//             </Button>
//             <Button onClick={nextCard}>Next Card →</Button>
//           </div>

//           <p className="text-sm text-gray-500">
//             Card {index + 1} of {flashcards.length}
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="bg-white p-10 rounded-lg shadow border text-xl font-semibold text-gray-700">
//           <p>{"You&apos;ve reached the end of the flashcards!"}</p>

//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button onClick={restart} variant="default">
//               Restart Deck
//             </Button>
//             <Button onClick={handleRegenerate} variant="secondary">
//               Regenerate Flashcards
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
//

// 'use client';
// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { useSummary } from '@/app/context/SummaryContext';
// import { Button } from '@/components/ui/button';

// export default function FlashcardsPage() {
//   const { lectureId } = useParams();

//   // Access context data for flashcards
//   const { flashcards, setFlashcards } = useSummary();

//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);
//   const [finished, setFinished] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [rawJson, setRawJson] = useState('');

//   // If flashcards are already in context, set them immediately
//   useEffect(() => {
//     if (flashcards) {
//       console.log('Loaded flashcards from context');
//       setIndex(0); // Reset index if flashcards are found
//     } else {
//       console.log('No flashcards found in context');
//     }
//   }, [flashcards]);

//   const current = flashcards ? flashcards[index] : null;

//   const nextCard = () => {
//     const next = index + 1;
//     if (next >= flashcards.length) {
//       setFinished(true);
//     } else {
//       setIndex(next);
//       setFlipped(false);
//     }
//   };

//   const restart = () => {
//     setIndex(0);
//     setFlipped(false);
//     setFinished(false);
//   };

//   const handleFlip = () => {
//     setFlipped((prev) => !prev);
//   };

//   const handleGenerateFlashcards = async () => {
//     setGenerating(true);
//     try {
//       const response = await fetch(`/api/flashcards`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ lectureId }),
//       });

//       // Log the raw response for debugging
//       const responseText = await response.text();
//       console.log('Raw API response:', responseText);

//       if (response.ok) {
//         try {
//           // First, parse the outer JSON response
//           const data = JSON.parse(response);

//           // Now parse the flashcards string into an array of objects
//           const flashcards = JSON.parse(data.flashcards); // Parse the stringified flashcards array
//           console.log('Flashcards generated:', flashcards);

//           // Store the parsed flashcards in context
//           setFlashcards(flashcards);
//           setRawJson(data.flashcards); // Optionally store raw JSON for debugging or display
//           console.log('Flashcards stored in context');
//         } catch (err) {
//           console.error('Error parsing JSON:', err);
//           console.error('Response was not JSON:', responseText);
//         }
//       } else {
//         console.error('Error generating flashcards:', responseText);
//       }
//     } catch (err) {
//       console.error('Error making API call:', err);
//     } finally {
//       setGenerating(false);
//     }
//   };

//   if (!flashcards) {
//     return (
//       <div className="p-6 max-w-xl mx-auto text-center space-y-6">
//         <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>
//         <p className="text-gray-500">You haven't generated any flashcards yet.</p>

//         <Button onClick={handleGenerateFlashcards} variant="default" disabled={generating}>
//           {generating ? 'Generating...' : 'Generate Flashcards'}
//         </Button>

//         {rawJson && (
//           <textarea
//             readOnly
//             className="w-full mt-4 p-3 border rounded font-mono text-sm bg-gray-50"
//             rows={20}
//             value={rawJson}
//           />
//         )}
//       </div>
//     );
//   }

//   if (current) {
//     return (
//       <div className="p-6 max-w-xl mx-auto text-center space-y-6">
//         <h2 className="text-2xl font-bold">Flashcards for Lecture {lectureId}</h2>

//         {!finished ? (
//           <>
//             <div
//               onClick={handleFlip}
//               className={`cursor-pointer bg-white p-10 rounded-lg shadow border text-xl font-medium min-h-[150px] flex items-center justify-center transition-transform duration-300 ${
//                 flipped ? 'rotate-[2deg] skew-y-1 bg-blue-50' : ''
//               }`}
//             >
//               {flipped ? current.definition : current.term}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button onClick={handleFlip} variant="outline">
//                 Flip
//               </Button>
//               <Button onClick={nextCard}>Next Card →</Button>
//             </div>

//             <p className="text-sm text-gray-500">
//               Card {index + 1} of {flashcards.length}
//             </p>
//           </>
//         ) : (
//           <>
//             <div className="bg-white p-10 rounded-lg shadow border text-xl font-semibold text-gray-700">
//               <p>{"You've reached the end of the flashcards!"}</p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button onClick={restart} variant="default">
//                 Restart Deck
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   }

//   return <div className="p-6 text-center text-gray-600">Loading flashcards...</div>;
// }

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
      if (flashcards) {
        console.log("✅ Loaded flashcards from context");
        setIndex(0);
        return;
      }

      console.log("📡 No flashcards in context, calling API...");
      setGenerating(true);
      setError(null);

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
          throw new Error(data.error || "Failed to load flashcards");

        setFlashcards(data.flashcards);
        setRawJson(JSON.stringify(data.flashcards, null, 2));
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
