'use client';

import { Sparkles, MessageSquare, Brain } from "lucide-react";
import Navbar from "../dashboard/_components/Navbar";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get ready for an enhanced learning experience with our upcoming premium features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Chat Features</h3>
            <p className="text-gray-600">
              Engage in intelligent conversations with our AI tutor. Get instant answers, explanations, and guidance on any topic.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
            <p className="text-gray-600">
              Receive tailored learning paths and content suggestions based on your progress and learning style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-gray-600">
              Track your learning progress with detailed insights and performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 