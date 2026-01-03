import { useState } from 'react';
import { downloadResume, downloadResumeDirectly } from '../services/api';

/**
 * Resume Download Button Component
 * Public component for downloading resume
 */
const ResumeDownloadButton = ({ variant = 'default' }) => {
  const [downloading, setDownloading] = useState(false);

  // Handle download using redirect method
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResume();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      // Reset after a short delay since download opens in new tab
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  // Alternative: Handle download using direct link method
  const handleDirectDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumeDirectly();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  // Button styles based on variant
  const buttonStyles = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      onClick={handleDownload} // Change to handleDirectDownload for alternative method
      disabled={downloading}
      className={`
        px-6 py-3 rounded-lg font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-2
        ${buttonStyles[variant] || buttonStyles.default}
      `}
    >
      {/* Download Icon */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {downloading ? 'Opening...' : 'Download Resume'}
    </button>
  );
};

export default ResumeDownloadButton;
