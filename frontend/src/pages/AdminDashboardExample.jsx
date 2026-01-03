import { useState, useEffect } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import { getResume } from '../services/api';

/**
 * Example: Admin Dashboard with Resume Management
 * Shows how to integrate resume upload in admin pages
 */
const AdminDashboard = () => {
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current resume info on mount
  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    try {
      const response = await getResume();
      if (response.success) {
        setCurrentResume(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch resume info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Upload Section */}
          <div>
            <ResumeUpload />
          </div>

          {/* Current Resume Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Current Resume</h2>
            
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : currentResume ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Filename:</p>
                  <p className="font-medium">{currentResume.resumeFileName || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Cloudinary Link:</p>
                  <a
                    href={currentResume.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all text-sm"
                  >
                    {currentResume.resumeLink}
                  </a>
                </div>

                <button
                  onClick={() => window.open(currentResume.resumeLink, '_blank')}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Preview Resume
                </button>

                <button
                  onClick={fetchResumeInfo}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Refresh Info
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No resume uploaded yet</p>
            )}
          </div>
        </div>

        {/* Other Admin Sections */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Manage Projects
            </button>
            <button className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              Update About Info
            </button>
            <button className="p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Manage Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
