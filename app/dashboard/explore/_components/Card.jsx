'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSummary } from '@/app/context/SummaryContext';

const fallbackColors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
];

// Simple function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
};

const Card = ({ lecture = {}, index, isRecommended = false }) => {
  const router = useRouter();
  const { setSummary } = useSummary();
  
  if (!lecture) {
    console.error('Lecture object is undefined at index', index);
    return null;
  }
  
  // Get the correct property names that exist in the lecture object
  const lectureId = lecture.id || lecture.summaryId || '';
  const title = lecture.summary_title || lecture.summaryTitle || 'Untitled Lecture';
  const description = lecture.summary_description || lecture.summaryDescription || 'No description available';
  const isPublic = lecture.is_public !== undefined ? lecture.is_public : (lecture.isPublic !== undefined ? lecture.isPublic : true);
  const slug = lecture.public_slug || lecture.publicSlug || null;
  
  // Use public_slug if available, otherwise use the lecture ID directly
  const lectureLink = slug 
    ? `/lecture/${slug}` 
    : `/${lectureId}/summary`;
    
  // Handle click to clear context and navigate
  const handleCardClick = (e) => {
    e.preventDefault();
    
    // Clear the context by setting summary to null
    // This forces the summary page to fetch fresh data from the API
    setSummary(null);
    
    // Remove stored summary from session storage
    sessionStorage.removeItem('summary');
    
    // Navigate to the lecture page
    router.push(lectureLink);
  };

  return (
    <div className="relative">
      <a href={lectureLink} onClick={handleCardClick} className="block">
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <div
            className={`h-32 w-full rounded-t-xl ${
              fallbackColors[index % fallbackColors.length]
            } relative`}
          >
            {isRecommended && (
              <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded-full shadow">
                Recommended
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">
              {title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
              {description}
            </p>
            <div className="flex justify-between items-center">
              <div
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  isPublic
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </div>
              <div className="text-xs text-gray-400">
                {formatDate(lecture.created_at)}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
