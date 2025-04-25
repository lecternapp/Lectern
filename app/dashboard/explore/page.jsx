'use client';

import React, { useEffect, useState } from 'react';
import Card from './_components/Card';
import Link from 'next/link';
import { IconClick } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';

// Track when the data was last fetched
let lastFetchTime = 0;
let cachedData = null;

// Track when recommendations were last fetched
let lastRecommendationFetchTime = 0;
let cachedRecommendations = {};

export default function ExplorePage() {
  const { user } = useUser();
  const userId = user?.id;

  const [lectures, setLectures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  
  // Fetch recommendations
  useEffect(() => {
    async function fetchRecommendations() {
      if (!userId) {
        setLoadingRecommendations(false);
        return;
      }
      
      const now = Date.now();
      const cacheAge = now - lastRecommendationFetchTime;
      
      // If we have cached recommendations for this user and they're less than 10 minutes old, use them
      if (cachedRecommendations[userId] && cacheAge < 600000) {
        console.log(`%c[CACHE] Using cached recommendations. Cache age: ${Math.round(cacheAge/1000)}s`, 'color: green; font-weight: bold');
        setRecommendations(cachedRecommendations[userId]);
        setLoadingRecommendations(false);
        return;
      }
      
      setLoadingRecommendations(true);
      try {
        console.log("%c[API] Fetching fresh recommendations from API...", 'color: blue; font-weight: bold');
        console.log("For user:", userId);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/explore/recommendations`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("Response not OK:", response.status, errorData);
          throw new Error(`Failed to fetch recommendations: ${response.status} ${errorData}`);
        }
        
        const data = await response.json();
        console.log("Received recommendations:", data);
        
        // Check if the response is valid
        if (Array.isArray(data) && data.length > 0) {
          const limitedData = data.slice(0, 3); // Limit to 3 recommendations
          setRecommendations(limitedData);
          
          // Update cache
          lastRecommendationFetchTime = now;
          cachedRecommendations[userId] = limitedData;
          
          console.log(`%c[API] Successfully cached ${limitedData.length} recommendations`, 'color: blue; font-weight: bold');
        } else {
          console.log("No recommendations returned from API");
          setRecommendations([]);
          
          // Cache empty results to avoid repeated calls
          lastRecommendationFetchTime = now;
          cachedRecommendations[userId] = [];
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setRecommendations([]);
      } finally {
        setLoadingRecommendations(false);
      }
    }
    
    fetchRecommendations();
  }, [userId]);
  
  // Fetch all lectures
  useEffect(() => {
    async function fetchLectures() {
      const now = Date.now();
      const cacheAge = now - lastFetchTime;
      
      // If we have cached data and it's less than 5 minutes old, use it
      if (cachedData && cacheAge < 300000) {
        console.log(`%c[CACHE] Using cached lectures data. Cache age: ${Math.round(cacheAge/1000)}s`, 'color: green; font-weight: bold');
        setLectures(cachedData);
        setLoading(false);
        return;
      }
      
      console.log('%c[API] Fetching fresh lectures data from API...', 'color: blue; font-weight: bold');
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explore`, {
          cache: 'force-cache',
          next: { revalidate: 300 }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch lectures: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const lectureData = Array.isArray(data) ? data : [];
        
        // Update our cache
        lastFetchTime = now;
        cachedData = lectureData;
        
        console.log(`%c[API] Successfully fetched ${lectureData.length} lectures from API`, 'color: blue; font-weight: bold');
        setLectures(lectureData);
      } catch (error) {
        console.error('Error fetching lectures:', error);
        setLectures([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLectures();
  }, []);

  return (
    <div>
      <header className="text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center p-4 gap-2">
            Explore recently created content <IconClick />
        </h1>
      </header>
      
      {/* Recommendations Section */}
      {userId && (
        <div className="mb-8 px-4">
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          
          {loadingRecommendations ? (
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="min-w-[300px] h-40 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
              ))}
            </div>
          ) : recommendations.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {recommendations.map((lecture, index) => (
                <div key={lecture.id} className="min-w-[300px] flex-shrink-0">
                  <Card lecture={lecture} index={index} isRecommended={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600">No personalized recommendations available yet.</p>
              <p className="text-sm text-gray-500 mt-1">Try uploading more lectures to get recommendations based on your interests.</p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between px-4 mb-4">
        <Link href="/topic">
          <span className="text-blue-500 hover:underline cursor-pointer">
            Go to Topic
          </span>
        </Link>
        
        <div className="text-sm text-gray-500">
          {recommendations.length > 0 ? 'Based on your learning history' : ''}
        </div>
      </div>

      <h2 className="text-xl font-semibold px-4 mb-4">All Public Lectures</h2>
      
      {loading ? (
        <div className="text-center p-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading lectures...</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4">
          {lectures.length > 0 ? (
            lectures.map((lecture, index) => (
              <Card key={lecture.id} lecture={lecture} index={index} />
            ))
          ) : (
            <div className="col-span-3 text-center p-8 text-gray-500">
              No lectures found. Check back later!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
