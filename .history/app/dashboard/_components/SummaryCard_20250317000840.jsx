"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function SummaryCard({ summary }) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the summary details page
    router.push(`/dashboard/summaries/${summary.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left border rounded-lg p-4 shadow-md bg-white hover:bg-gray-100 transition"
    >
      <h2 className="text-xl font-semibold">{summary.title}</h2>
      <p className="text-gray-600">{summary.summary}</p>
    </button>
  );
}
