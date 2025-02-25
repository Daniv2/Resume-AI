import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Download, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

interface Document {
  id: string;
  title: string;
  type: 'resume' | 'cover_letter';
  content: {
    text: string;
    metadata: {
      jobTitle: string;
      company: string;
      generatedAt: string;
    }
  };
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }

  async function deleteDocument(id: string) {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error('Failed to delete document');
    }
  }

  const downloadPDF = async (doc: Document) => {
    try {
      // Create content container
      const contentContainer = window.document.createElement('div');
      contentContainer.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif;">
          <h1 style="color: #1a365d; margin-bottom: 20px; font-size: 24px;">${doc.title}</h1>
          <div style="white-space: pre-wrap; line-height: 1.6; font-size: 14px;">
            ${doc.content.text}
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #666;">
            Generated for ${doc.content.metadata.jobTitle} at ${doc.content.metadata.company}
            on ${new Date(doc.content.metadata.generatedAt).toLocaleDateString()}
          </div>
        </div>
      `;

      // PDF generation options
      const options = {
        margin: [0.5, 0.5],
        filename: `${doc.title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          logging: false,
          useCORS: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait'
        }
      };

      // Generate PDF
      const pdf = await html2pdf()
        .from(contentContainer)
        .set(options)
        .save();

      toast.success('Document downloaded successfully');
      return pdf;
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download document. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
        <Link
          to="/generate"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Document
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
          <p className="text-gray-500">Create your first resume or cover letter to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <li key={doc.id}>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.type === 'resume' ? 'Resume' : 'Cover Letter'} •{' '}
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => downloadPDF(doc)}
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {selectedDoc && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.title}</h2>
                    <button
                      onClick={() => setSelectedDoc(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-base">
                      {selectedDoc.content.text}
                    </pre>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => downloadPDF(selectedDoc)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}