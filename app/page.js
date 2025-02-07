import { Button } from "@/components/ui/button";
import { AiOutlineBook, AiOutlineBarChart, AiOutlineExperiment } from "react-icons/ai";
import Header from "./dashboard/_components/Navbar"; 
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Elevate Your Academic Success with Lectern
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Summarize your lectures effortlessly with our AI-powered academic assistant.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-4 bg-white text-blue-900 rounded-md shadow-lg hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            Why Choose Lectern?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition">
              <AiOutlineBook className="text-blue-900 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Comprehensive Summaries</h3>
              <p className="text-gray-600">
                Turn lengthy lectures into concise and accurate summaries with ease.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition">
              <AiOutlineExperiment className="text-blue-900 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Real-Time Analysis</h3>
              <p className="text-gray-600">
                Stay ahead with instant insights and key takeaways from your lectures.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition">
              <AiOutlineBarChart className="text-blue-900 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">In-depth Analytics</h3>
              <p className="text-gray-600">
                Understand complex topics with visual analytics powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Studies?</h2>
          <p className="text-xl mb-8">
            Sign up today and simplify your academic journey with Lectern.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-4 bg-white text-blue-900 rounded-md shadow-lg hover:bg-gray-100 transition">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm">&copy; 2024 Lectern. All rights reserved.</p>
          <nav className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white">Blog</a>
            <a href="#" className="text-gray-400 hover:text-white">FAQs</a>
            <a href="#" className="text-gray-400 hover:text-white">Support</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
