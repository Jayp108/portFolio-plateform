import ResumeDownloadButton from '../components/ResumeDownloadButton';

/**
 * Example: Home Page with Resume Download
 * Shows how to integrate the download button in your public pages
 */
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            John Doe
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Full Stack Developer | MERN Stack Specialist
          </p>
          
          {/* Resume Download Button */}
          <div className="flex justify-center gap-4">
            <ResumeDownloadButton variant="primary" />
            <button className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About Me
          </h2>
          <p className="text-gray-600 leading-relaxed">
            I'm a passionate full-stack developer specializing in the MERN stack.
            With expertise in building scalable web applications, I focus on creating
            seamless user experiences and robust backend systems.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git'].map((skill) => (
              <div key={skill} className="p-4 bg-white rounded-lg shadow text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Another Download Button */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-xl mb-8">
            Download my resume to learn more about my experience
          </p>
          <ResumeDownloadButton variant="outline" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
