import { Button } from "@/components/ui/button";
import { AiOutlineBook, AiOutlineBarChart, AiOutlineExperiment } from "react-icons/ai";
import Navbar from "./dashboard/_components/Navbar"; 
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
     
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-100 to-blue-50">
        <div className="relative z-10 p-8 max-w-5xl">
          <span className="text-blue-600 font-semibold mb-4 block">AI-Powered Learning Assistant</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900">
            Transform Your Study Notes Into <span className="text-blue-600">Clear Knowledge</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-slate-600">
            Let AI help you understand and retain your lecture content better. 
            Get clear summaries, key points, and study materials in seconds.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 bg-blue-600 text-white rounded-lg text-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
              Try Lectern Free →
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-blue-600 font-semibold text-center block mb-4">Features</span>
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-slate-600 text-center mb-16 text-lg max-w-2xl mx-auto">
            Powerful tools designed to enhance your learning experience and improve your academic performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <AiOutlineBook className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Smart Summaries</h3>
              <p className="text-slate-600 leading-relaxed">
                Get concise, intelligent summaries of your lectures that highlight the most important concepts.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <AiOutlineExperiment className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Real-Time Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Instantly analyze your notes for key concepts, relationships, and important details.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <AiOutlineBarChart className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Learning Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Track your understanding and identify areas that need more attention with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-blue-400 font-semibold mb-4 block">Get Started Today</span>
          <h2 className="text-4xl font-bold mb-6">Ready to Upgrade Your Learning?</h2>
          <p className="text-xl mb-12 text-slate-300">
            Join thousands of students who are already studying smarter, not harder.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300">
              Start Learning Better →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-100 text-slate-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm">&copy; 2024 Lectern. All rights reserved.</p>
            </div>
            <nav className="flex justify-start md:justify-end gap-8">
              <a href="#" className="text-sm hover:text-blue-600 transition-colors">Blog</a>
              <a href="#" className="text-sm hover:text-blue-600 transition-colors">FAQs</a>
              <a href="#" className="text-sm hover:text-blue-600 transition-colors">Support</a>
              <a href="#" className="text-sm hover:text-blue-600 transition-colors">Privacy</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
