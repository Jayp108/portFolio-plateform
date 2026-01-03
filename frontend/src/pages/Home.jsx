import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimelineImage from '../assets/Images/TimelineImage.png';
import api from '../services/api';
import { toast } from 'react-toastify';

const Home = () => {
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);

  useEffect(() => {
    checkResumeAvailability();
  }, [resumeAvailable]);

  const checkResumeAvailability = async () => {
    try {
      const response = await api.get('/about/resume');
      if (response.data.success && response.data.data.resumeLink) {
        console.log(response.data);
        setResumeAvailable(true);
      }
    } catch (error) {
      setResumeAvailable(false);
    }
  };

  const handleDownloadResume = async () => {
    setResumeLoading(true);
    try {
      const response = await api.get('/about/resume/download', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download resume');
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .wave-letter {
            display: inline-block;
            animation: wave 1.6s ease-in-out infinite;
          }

          @keyframes wave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-1xl font-bold text-gray-900 mb-6">
                {'Welcome to My Portfolio'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="wave-letter"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))
                }
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl">
                Full-Stack Developer | MERN Stack Expert | Building Amazing Web Applications
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-secondary transition duration-300"
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-medium border-2 border-primary hover:bg-gray-50 transition duration-300"
                >
                  Contact Me
                </Link>
                {resumeAvailable && (
                  <button
                    onClick={handleDownloadResume}
                    disabled={resumeLoading}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-300 disabled:opacity-50"
                  >
                    {resumeLoading ? 'Downloading...' : '📄 Download Resume'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={TimelineImage}
                alt="Portfolio illustration"
                // className="w-full max-w-md rounded-xl shadow-2xl hover:scale-105 transition duration-300"
                className='w-full max-w-md rounded-xl shadow-xl hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
'
              />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3">Frontend Development</h3>
              <p className="text-gray-600">
                Building responsive and interactive user interfaces with React, Tailwind CSS, and modern web technologies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3">Backend Development</h3>
              <p className="text-gray-600">
                Creating robust APIs and server-side applications with Node.js, Express, and MongoDB.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-2xl font-bold mb-3">Full-Stack Solutions</h3>
              <p className="text-gray-600">
                Delivering end-to-end solutions with seamless integration and optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
