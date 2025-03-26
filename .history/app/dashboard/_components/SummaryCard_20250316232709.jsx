import React from "react";

export default function SummaryCard({ summary }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold">{summary.title}</h2>
      <p className="text-gray-600">{summary.summary}</p>
    </div>
  );
}
