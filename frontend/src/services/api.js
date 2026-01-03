import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   RESPONSE INTERCEPTOR
====================== */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* ======================
   RESUME API FUNCTIONS
====================== */

/**
 * Upload resume (Admin only)
 * @param {File} file - PDF file to upload
 * @returns {Promise} - API response
 */
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await api.put('/about/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get resume information
 * @returns {Promise} - Resume link and filename
 */
export const getResume = async () => {
  try {
    const response = await api.get('/about/resume');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Download resume (Public access)
 * Redirects to Cloudinary URL for download
 */
export const downloadResume = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const downloadUrl = `${baseURL}/about/resume/download`;
    
    // Open in new tab - will redirect to Cloudinary
    window.open(downloadUrl, '_blank');
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

/**
 * Alternative: Direct download using fetch
 * This method handles the download in the same tab
 */
export const downloadResumeDirectly = async () => {
  try {
    const response = await getResume();
    if (response.success && response.data.resumeLink) {
      // Direct download from Cloudinary URL
      const link = document.createElement('a');
      link.href = response.data.resumeLink;
      link.download = response.data.resumeFileName || 'resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export default api;
