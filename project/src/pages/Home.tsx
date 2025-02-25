import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Download, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Professional Resumes with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your career journey with AI-powered resume and cover letter generation.
          Stand out from the crowd with perfectly tailored documents.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Get Started <Sparkles className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FileText className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Generation</h3>
            <p className="text-gray-600">
              Let AI craft your perfect resume and cover letter based on your experience and the job description.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Download className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="text-gray-600">
              Download your documents in PDF or DOCX format, ready to send to employers.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <History className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Document History</h3>
            <p className="text-gray-600">
              Access and manage all your previously generated documents in one place.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center bg-indigo-50 rounded-2xl my-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Create Your Professional Resume?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of job seekers who have already improved their job search with our AI-powered platform.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Start Free
        </Link>
      </div>
    </div>
  );
}