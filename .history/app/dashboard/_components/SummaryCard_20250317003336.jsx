"use client";
import { useRouter } from "next/navigation";

export default function SummaryCard({ summary }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/dashboard/summaries/${summary.id}`)}
      className="w-full text-left border rounded-lg p-4 shadow-md bg-white hover:bg-gray-100 transition"
    >
      <h2 className="text-xl font-semibold">{summary.title}</h2>
      <p className="text-gray-600">{summary.summary}</p>
    </button>
  );
}
