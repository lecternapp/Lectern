"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSummary } from "@/app/context/SummaryContext";

const fallbackColors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
];

const getAbbreviatedId = (id) => {
  return id?.length > 8 ? `${id.slice(0, 8)}...` : id;
};

export default function LecturesPage() {
  const { summaries, setSummaries } = useSummary();
  const { user } = useUser();
  const userId = user?.id;

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLectures = async () => {
      if (!userId) return;

      // Log the summaries context
      console.log("Summaries from context:", summaries);

      if (summaries && summaries.length > 0) {
        setLectures(summaries);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/lectures?user_id=${userId}`);
        const data = await res.json();

        // Log the fetched data
        console.log("Fetched data:", data);

        if (!res.ok) throw new Error(data.error || "Failed to fetch lectures");

        const lectureList = data.lectures || [];
        setLectures(lectureList);
        setSummaries(lectureList); // Save to context
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
  }, [userId, summaries, setSummaries]);

  if (loading)
    return <div className="p-6 text-gray-600">Loading lectures...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  // Log the lectures state after it has been set
  console.log("Lectures to display:", lectures);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <Link key={lecture.id} href={`/${lecture.id}/summary`}>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <div
                className={`h-32 w-full rounded-t-xl ${
                  fallbackColors[index % fallbackColors.length]
                } relative`}
              >
                <span className="absolute top-2 right-2 text-white font-bold">
                  {getAbbreviatedId(lecture.id)}
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {lecture.summaryTitle || "Untitled Lecture"}
                </h2>
                <p className="text-sm text-gray-500">
                  {lecture.summaryDescription || "No description available."}
                </p>
                <div
                  className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    lecture.isPublic
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {lecture.isPublic ? "Public Page" : "Private Page"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
