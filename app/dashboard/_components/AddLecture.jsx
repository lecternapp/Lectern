// File 1 (legacy):
// 'use client';
// import { useState, useEffect } from 'react';
// import { CloudArrowUpIcon, DocumentTextIcon, VideoCameraIcon, XCircleIcon } from '@heroicons/react/24/outline';
// import { Button } from '@/components/ui/button';
// import ReactMarkdown from 'react-markdown';
// import { GenerateContent_AI } from '@/configs/AiModel';
// import LectureSettingsModal from './LectureSettingsModal';

// export default function AddLecture() {
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState(null);
//   const [parsedText, setParsedText] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [transcription, setTranscription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [shouldGenerate, setShouldGenerate] = useState(false);
//   const [error, setError] = useState('');
//   const [summary, setSummary] = useState('');

//   const [lectureName, setLectureName] = useState('My Lecture');
//   const [isPublic, setIsPublic] = useState(true);
//   const [description, setDescription] = useState('');
//   const [showSettingsModal, setShowSettingsModal] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.size > 100 * 1024 * 1024) {
//       setError('File size exceeds 100MB limit');
//       return;
//     }
//     const type = selectedFile.type.startsWith('video/') ? 'video' : 'document';
//     setFileType(type);
//     setFile(selectedFile);
//     setError('');
//   };

//   const clearFile = () => {
//     setFile(null);
//     setFileType(null);
//     setParsedText('');
//     setVideoUrl('');
//     setTranscription('');
//     setError('');
//     setSummary('');
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file first');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('fileType', fileType);

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || 'Upload failed');

//       if (data.type === 'video') {
//         setVideoUrl(data.videoUrl);
//         setTranscription(data.transcription);
//       } else {
//         setParsedText(data.text);
//       }

//       setShowSettingsModal(true);  // open settings modal
//       setShouldGenerate(true);     // trigger AI summary generation

//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const generateSummary = async () => {
//       setIsGenerating(true);

//       const USER_TRANSCRIPT = parsedText || transcription;
//       const prompt = Analyze this lecture content and provide a detailed summary:

// ${USER_TRANSCRIPT.slice(0, 30000)}

// Format your response with:
// - Main topics covered
// - Key points
// - Important concepts;

//       try {
//         const result = await GenerateContent_AI.sendMessage({ text: prompt });
//         setSummary(result);
//       } catch (err) {
//         setError('Failed to generate summary.');
//       } finally {
//         setIsGenerating(false);
//         setLoading(false);
//         setShouldGenerate(false);
//       }
//     };

//     if (shouldGenerate) {
//       generateSummary();
//     }
//   }, [shouldGenerate, parsedText, transcription]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Lecture Materials</h2>

//         <form onSubmit={handleUpload} className="space-y-6">
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               {fileType === 'video' ? (
//                 <VideoCameraIcon className="h-12 w-12 text-gray-400" />
//               ) : (
//                 <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
//               )}
//               <div className="text-center">
//                 <label className="block">
//                   <span className="text-gray-700 text-lg font-medium">
//                     Drop your file here or
//                     <span className="text-blue-500 hover:text-blue-600 cursor-pointer"> browse</span>
//                   </span>
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".ppt,.pptx,.pdf,.doc,.docx,.mp4,.mov,.avi,.webm"
//                     className="hidden"
//                   />
//                 </label>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Supports PPT, PPTX, PDF, DOC, DOCX, MP4, MOV, AVI, WEBM (up to 100MB)
//                 </p>
//               </div>
//             </div>
//           </div>

//           {file && (
//             <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 {fileType === 'video' ? (
//                   <VideoCameraIcon className="h-6 w-6 text-blue-500" />
//                 ) : (
//                   <DocumentTextIcon className="h-6 w-6 text-blue-500" />
//                 )}
//                 <span className="text-sm font-medium text-gray-700">{file.name}</span>
//               </div>
//               <button
//                 type="button"
//                 onClick={clearFile}
//                 className="text-gray-400 hover:text-red-500"
//               >
//                 <XCircleIcon className="h-6 w-6" />
//               </button>
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center space-x-2">
//               <XCircleIcon className="h-5 w-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={!file || loading}
//             className={w-full py-3 px-4 rounded-lg text-white font-medium
//               ${!file || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition-colors'}
//             }
//           >
//             {loading ? 'Processing & Generating...' : Process ${fileType === 'video' ? 'Video' : 'Document'}}
//           </button>
//         </form>

//         {summary && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
//             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <div className="prose max-w-none">
//                 <ReactMarkdown>{summary}</ReactMarkdown>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <LectureSettingsModal
//         isOpen={showSettingsModal}
//         onClose={() => setShowSettingsModal(false)}
//         onConfirm={({ lectureName, isPublic, description }) => {
//           setLectureName(lectureName);
//           setIsPublic(isPublic);
//           setDescription(description);
//         }}
//       />
//     </div>
//   );
// }



// 'use client';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { CloudArrowUpIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';
// import ReactMarkdown from 'react-markdown';
// import { useUser } from '@clerk/nextjs';
// import { useSummary } from '@/app/context/SummaryContext';

// export default function AddLecture()  {
//     const [file, setFile] = useState(null);
//     const [summary, setSummary] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const { user } = useUser();
//     const { summary: summaryCtx, setSummary: setSummaryCtx } = useSummary();
//     const userId = user?.id;

//     // Log summary context when it updates
//     useEffect(() => {
//         if (summaryCtx) {
//             console.log('🧠 Summary in context updated:', summaryCtx);
//         }
//     }, [summaryCtx]);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
        
//         if (selectedFile && selectedFile.size > 100 * 1024 * 1024) {
//             setError('File size exceeds 100MB limit');
//             return;
//         }

//         setFile(selectedFile);
//         setError('');
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setError('Please select a file first');
//             return;
//         }

//         setLoading(true);
//         setError('');
//         setSummary('');

//         try {
//             const formData = new FormData();
//             formData.append('file', file);

//             const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload?user_id=${userId}`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Upload failed');
//             }

//             setSummary(data.summary);        // local state
//             setSummaryCtx(data.summary);     // context state

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const clearFile = () => {
//         setFile(null);
//         setSummary('');
//         setError('');
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Lecture Materials</h2>
                
//                 <form onSubmit={handleUpload} className="space-y-6">
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
//                         <div className="flex flex-col items-center justify-center space-y-4">
//                             <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
//                             <div className="text-center">
//                                 <label className="block cursor-pointer">
//                                     <span className="text-gray-700 text-lg font-medium">
//                                         Drop your file here or <span className="text-blue-500 hover:text-blue-600">browse</span>
//                                     </span>
//                                     <input
//                                         type="file"
//                                         onChange={handleFileChange}
//                                         accept=".pdf,.doc,.docx,.pptx,.xlsx,.txt"
//                                         className="hidden"
//                                     />
//                                 </label>
//                                 <p className="text-sm text-gray-500 mt-2">
//                                     Supported formats: PDF, DOCX, PPTX, XLSX, TXT (max 100MB)
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {file && (
//                         <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
//                             <div className="flex items-center space-x-3">
//                                 <DocumentTextIcon className="h-6 w-6 text-blue-500" />
//                                 <span className="text-sm font-medium text-gray-700">{file.name}</span>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={clearFile}
//                                 className="text-gray-400 hover:text-red-500"
//                             >
//                                 <XCircleIcon className="h-6 w-6" />
//                             </button>
//                         </div>
//                     )}

//                     {error && (
//                         <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center space-x-2">
//                             <XCircleIcon className="h-5 w-5" />
//                             <span>{error}</span>
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={!file || loading}
//                         className={`w-full py-3 px-4 rounded-lg text-white font-medium
//                             ${!file || loading 
//                                 ? 'bg-gray-300 cursor-not-allowed' 
//                                 : 'bg-blue-500 hover:bg-blue-600 transition-colors'
//                             }`}
//                     >
//                         {loading ? (
//                             <span className="flex items-center justify-center space-x-2">
//                                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 <span>Processing...</span>
//                             </span>
//                         ) : (
//                             'Process Document'
//                         )}
//                     </button>

//                     {summary && (
//                         <div className="mt-6">
//                             <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
//                             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                                 <div className="prose max-w-none">
//                                     <ReactMarkdown>{summary}</ReactMarkdown>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }


'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloudArrowUpIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { useUser } from '@clerk/nextjs';
import { useSummary } from '@/app/context/SummaryContext';
import LectureSettingsModal from './LectureSettingsModal';

export default function AddLecture() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [lectureName, setLectureName] = useState('My Lecture');
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  const { user } = useUser();
  const { setSummary: setSummaryCtx } = useSummary();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (file) {
      setShowSettingsModal(true);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 100 * 1024 * 1024) {
      setError('File size exceeds 100MB limit');
      return;
    }
    setFile(selectedFile);
    setError('');
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

      // redirect to summary page
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <LectureSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onConfirm={handleSettingsConfirm}
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
                : 'bg-blue-500 hover:bg-blue-600 transition-colors'}
            `}
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
