'use client';

import { Upload, Brain, BookOpen } from "lucide-react";
import Navbar from "../dashboard/_components/Navbar";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Lectern Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your learning materials into an interactive study experience in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload Your Content</h3>
            <p className="text-gray-600">
              Simply upload your lecture notes, presentations, or study materials. We support various formats including PDF, DOCX, and text files.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes your content, creating summaries, generating quizzes, and preparing interactive flashcards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Start Learning</h3>
            <p className="text-gray-600">
              Access your personalized study materials, take interactive quizzes, and review flashcards to master your content.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Ready to transform your learning experience?
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
} 