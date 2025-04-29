'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudArrowUpIcon, DocumentTextIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { useUser } from '@clerk/nextjs';
import { useSummary } from '@/app/context/SummaryContext';
import LectureSettingsModal from './LectureSettingsModal';

export default function AddLecture() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [embeddingServiceStatus, setEmbeddingServiceStatus] = useState(null);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [lectureName, setLectureName] = useState('My Lecture');
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  const { user } = useUser();
  const { setSummary: setSummaryCtx } = useSummary();
  const userId = user?.id;
  const router = useRouter();

  // Automatically set lectureName from filename (no extension)
  const getFileBaseName = (filename) => {
    return filename.replace(/\.[^/.]+$/, '') || 'My Lecture';
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 100 * 1024 * 1024) {
      setError('File size exceeds 100MB limit');
      return;
    }
    setFile(selectedFile);
    setLectureName(getFileBaseName(selectedFile.name)); // Set default name
    setError('');
    setShowSettingsModal(true);
  };

  const handleSettingsConfirm = ({ lectureName, isPublic, description }) => {
    setLectureName(lectureName);
    setIsPublic(isPublic);
    setDescription(description);
    setShowSettingsModal(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('lectureName', lectureName);
      formData.append('isPublic', isPublic);
      formData.append('description', description);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload?user_id=${userId}`,
        { method: 'POST', body: formData }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Upload failed');

      setSummary(data.summary);
      setSummaryCtx(data.summary);
      router.push(`/${data.lectureId}/summary`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSummary('');
    setError('');
  };

  const checkEmbeddingService = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/status`);
      const data = await response.json();
      setEmbeddingServiceStatus(data.embedding_service_active);
    } catch (err) {
      console.error('Failed to check embedding service status:', err);
      setEmbeddingServiceStatus(false);
    }
  };

  useEffect(() => {
    if (file) {
      checkEmbeddingService();
    }
  }, [file]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <LectureSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onConfirm={handleSettingsConfirm}
        defaultLectureName={lectureName} // 👈 passes in stripped file name
      />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Lecture Materials</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}
          className="space-y-6"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center justify-center space-y-4">
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
              <div className="text-center">
                <label className="block cursor-pointer">
                  <span className="text-gray-700 text-lg font-medium">
                    Drop your file here or <span className="text-blue-500 hover:text-blue-600">browse</span>
                  </span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.pptx,.xlsx,.txt"
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF, DOCX, PPTX, XLSX, TXT (max 100MB)
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">{file.name}</span>
              </div>
              <button type="button" onClick={clearFile} className="text-gray-400 hover:text-red-500">
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          {file && embeddingServiceStatus === false && (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg flex flex-col space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span className="font-semibold">Embedding Service Status: Inactive</span>
              </div>
              <p className="text-sm">
                Chat and recommendations features will be affected. To enable these features, please set up Ollama with the nomic-embed-text model.
              </p>
              <a 
                href="https://ollama.ai/library/nomic-embed-text" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                View Ollama Documentation →
              </a>
            </div>
          )}

          {file && embeddingServiceStatus === true && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5" />
                <span className="font-semibold">Embedding Service Status: Active</span>
              </div>
              <p className="text-sm">All features including chat and recommendations will work as expected.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center space-x-2">
              <XCircleIcon className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading || showSettingsModal}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium
              ${!file || loading || showSettingsModal
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition-colors'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </span>
            ) : (
              'Process Document'
            )}
          </button>

          {summary && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="prose max-w-none">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
