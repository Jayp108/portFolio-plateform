import express from 'express';
import { 
  getAbout, 
  createOrUpdateAbout, 
  uploadResume, 
  getResume,
  downloadResume,
  addSkill,
  deleteSkill
} from '../controllers/aboutController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { upload, handleMulterError } from '../middlewares/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAbout);
router.get('/resume', getResume);
router.get('/resume/download', downloadResume);

// Admin only routes
router.put('/', protect, adminOnly, createOrUpdateAbout);
router.post('/skills', protect, adminOnly, addSkill);
router.delete('/skills', protect, adminOnly, deleteSkill);

// Resume upload with multer error handling
router.put(
  '/resume', 
  protect, 
  adminOnly, 
  upload.single('resume'), 
  handleMulterError,
  uploadResume
);

export default router;
