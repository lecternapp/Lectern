'use client';
import { useState } from 'react';

export default function AddLecture() {
    const [file, setFile] = useState(null);
    const [parsedText, setParsedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        // Check file size (50MB in bytes)
        if (selectedFile && selectedFile.size > 50 * 1024 * 1024) {
            setError('File size exceeds 50MB limit');
            return;
        }
        
        setFile(selectedFile);
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setParsedText(data.text);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Lecture</h2>
            
            <form onSubmit={handleUpload} className="space-y-4">
                <div>
                    <label className="block mb-2">
                        Upload Presentation:
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".ppt,.pptx,.pdf,.doc,.docx"
                            className="block w-full mt-1"
                        />
                        <span className="text-sm text-gray-500">
                            Maximum file size: 50MB
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Upload and Parse'}
                </button>

                {error && (
                    <div className="text-red-500 mt-2">
                        {error}
                    </div>
                )}

                {parsedText && (
                    <div className="mt-4">
                        <h3 className="font-bold mb-2">Parsed Content:</h3>
                        <div className="p-4 bg-gray-100 rounded">
                            {parsedText}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
