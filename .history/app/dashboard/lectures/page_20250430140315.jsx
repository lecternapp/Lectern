"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSummary } from "@/app/context/SummaryContext";
import LectureUpdateModal from "@/app/dashboard/_components/LectureUpdateModal";
import { MoreHorizontal } from "lucide-react";

const fallbackColors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
];

// Utility function: show "New" if lecture was created in the last 10 minutes
const isNewLecture = (createdAt) => {
  if (!createdAt) return false;
  const now = new Date();
  const created = new Date(createdAt);
  const diffInMinutes = (now - created) / 1000 / 60;
  return diffInMinutes < 10;
};

export default function LecturesPage() {
  const { summaries, setSummaries, setSummary } = useSummary();
  const { user } = useUser();
  const userId = user?.id;

  const [lectures, setLectures] = useState(summaries || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const loadLectures = async () => {
      if (!userId) return;

      setLectures(summaries || []); // Show cached immediately

      try {
        const res = await fetch(`/api/lectures?user_id=${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch lectures");

        const lectureList = data.lectures || [];
        setLectures(lectureList);
        setSummaries(lectureList);
      } catch (err) {
        console.error("Failed to refresh lecture list:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
  }, [userId, setSummaries]);

  const handleEditClick = (lecture, e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedLecture(lecture);
    setModalOpen(true);
  };

  const handleUpdateLecture = async (updatedLecture) => {
    try {
      const res = await fetch(`/api/updatelecture`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLecture),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        console.error("Server error:", responseBody);
        throw new Error("Failed to update lecture");
      }

      const updatedFromServer = responseBody;

      const updatedLectures = lectures.map((lec) =>
        lec.id === updatedFromServer.id ? updatedFromServer : lec
      );

      setLectures(updatedLectures);
      setSummaries(updatedLectures);
      setModalOpen(false);
    } catch (err) {
      console.error("Error updating lecture:", err);
    }
  };

  if (loading && lectures.length === 0) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-48 bg-gray-100 animate-pulse rounded-xl shadow"
          />
        ))}
      </div>
    );
  }

  if (error && lectures.length === 0) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <div key={lecture.id} className="relative">
            <Link
              href={`/${lecture.id}/summary`}
              onClick={() => setSummary(null)}
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <div
                  className={`h-32 w-full rounded-t-xl ${
                    fallbackColors[index % fallbackColors.length]
                  } relative`}
                >
                  <button
                    onClick={(e) => handleEditClick(lecture, e)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white shadow"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
                <div className="p-4">
                  {/* 🆕 New tag */}
                  {isNewLecture(lecture.createdAt || lecture.created_at) && (
                    <span className="inline-block mb-2 mr-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      New
                    </span>
                  )}
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

            <button
              onClick={(e) => handleEditClick(lecture, e)}
              className="absolute top-2 left-2 p-1 rounded hover:bg-gray-100"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <LectureUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleUpdateLecture}
        initialLecture={selectedLecture}
      />
    </div>
  );
}
 