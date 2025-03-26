"use client";
import React, { useState, useEffect } from "react";
import SummaryCard from "@/components/SummaryCard";

const mockSummaries = [
  { id: 1, title: "Introduction to Physics", summary: "This lecture covered Newton's laws, motion, and gravity..." },
  { id: 2, title: "World War II Overview", summary: "We explored the causes and consequences of World War II..." },
];

export default function SummariesPage() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    setSummaries(mockSummaries);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Summaries</h1>
      <div className="space-y-4">
        {summaries.map((summary) => (
          <SummaryCard key={summary.id} summary={summary} />
        ))}
      </div>
    </div>
  );
}
