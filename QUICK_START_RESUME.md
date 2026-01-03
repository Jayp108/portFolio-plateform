# QUICK START GUIDE - Resume Upload/Download

## 🚀 Setup (5 Minutes)

### 1. Backend Setup

```bash
# Install Cloudinary
cd backend
npm install cloudinary

# Add to .env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get Cloudinary credentials:** https://cloudinary.com/console

### 2. Test Backend

```bash
# Start server
npm run dev

# Test upload (Postman)
PUT http://localhost:5000/api/about/resume
Authorization: Bearer YOUR_ACCESS_TOKEN
Body: form-data
  Key: resume
  Value: [Select PDF file]

# Test download (Browser)
http://localhost:5000/api/about/resume/download
```

---

## 💻 Frontend Integration

### Admin Page (Upload)

```jsx
import ResumeUpload from '../components/ResumeUpload';

function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ResumeUpload />
    </div>
  );
}
```

### Public Page (Download)

```jsx
import ResumeDownloadButton from '../components/ResumeDownloadButton';

function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ResumeDownloadButton variant="primary" />
    </div>
  );
}
```

---

## 🎯 API Quick Reference

### Upload Resume
```javascript
import { uploadResume } from '../services/api';

const handleUpload = async (file) => {
  try {
    const response = await uploadResume(file);
    console.log('Success:', response.message);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Download Resume
```javascript
import { downloadResume } from '../services/api';

const handleDownload = async () => {
  try {
    await downloadResume(); // Opens in new tab
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

---

## 🔧 Common Issues

### Issue: "Cloudinary configuration is missing"
**Solution:** Check `.env` file has all 3 Cloudinary variables

### Issue: "Only PDF files are allowed"
**Solution:** Ensure file type is `application/pdf`

### Issue: "File size is too large"
**Solution:** File must be ≤ 5MB

### Issue: Upload returns 401
**Solution:** Check JWT token in localStorage

### Issue: Download returns 404
**Solution:** Upload a resume first via admin panel

---

## 📦 Deployment

### Render
1. Add environment variables in Render dashboard
2. Deploy
3. Test: `https://your-app.onrender.com/api/about/resume/download`

### Vercel
1. Set `VITE_API_BASE_URL=https://your-app.onrender.com/api`
2. Deploy
3. Test upload and download features

---

## ✅ Done!

Your resume functionality is now ready to use. 

**Need help?** Check `CLOUDINARY_IMPLEMENTATION.md` for detailed documentation.
