'use client';

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const loadLectures = async () => {
      if (!userId) return;

      if (summaries && summaries.length > 0) {
        setLectures(summaries);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/lectures?user_id=${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch lectures");

        const lectureList = data.lectures || [];
        setLectures(lectureList);
        setSummaries(lectureList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
  }, [userId, summaries, setSummaries]);

  const handleEditClick = (lecture, e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedLecture(lecture);
    setModalOpen(true);
  };

  const handleUpdateLecture = async (updatedLecture) => {
    try {
      const res = await fetch(`/api/lectures/${updatedLecture.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLecture),
      });

      if (!res.ok) throw new Error("Failed to update lecture");

      const updatedLectures = lectures.map((lec) =>
        lec.id === updatedLecture.id ? updatedLecture : lec
      );

      setLectures(updatedLectures);
      setSummaries(updatedLectures);
    } catch (err) {
      console.error("Error updating lecture:", err);
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading lectures...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <div key={lecture.id} className="relative">
            <Link href={`/${lecture.id}/summary`}>
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
    <div
      className={`h-32 w-full rounded-t-xl ${
        fallbackColors[index % fallbackColors.length]
      } relative`}
    >
      {/* Triple Dot Button */}
      <button
        onClick={(e) => handleEditClick(lecture, e)}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white shadow"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-800" />
      </button>
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
