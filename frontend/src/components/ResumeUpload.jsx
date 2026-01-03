import { useState } from 'react';
import { uploadResume } from '../services/api';

/**
 * Admin Resume Upload Component
 * Allows admin to upload PDF resume to Cloudinary
 */
const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type
    if (file && file.type !== 'application/pdf') {
      setMessage({ 
        type: 'error', 
        text: 'Only PDF files are allowed' 
      });
      setSelectedFile(null);
      return;
    }

    // Validate file size (5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage({ 
        type: 'error', 
        text: 'File size must be less than 5MB' 
      });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage({ type: '', text: '' });
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ 
        type: 'error', 
        text: 'Please select a file first' 
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await uploadResume(selectedFile);
      
      setMessage({ 
        type: 'success', 
        text: response.message || 'Resume uploaded successfully!' 
      });
      
      // Reset file input
      setSelectedFile(null);
      document.getElementById('resume-input').value = '';
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to upload resume' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      
      {/* File Input */}
      <div className="mb-4">
        <label 
          htmlFor="resume-input" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select PDF Resume (Max 5MB)
        </label>
        <input
          id="resume-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className={`w-full py-2 px-4 rounded-md font-medium text-white
          ${!selectedFile || uploading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mt-4 p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
