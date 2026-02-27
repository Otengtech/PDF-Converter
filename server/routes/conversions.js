import express from 'express';
import multer from 'multer';
import { protect, checkSubscription } from '../middleware/auth.js';
import { 
  convertPDF, 
  getConversionStatus, 
  getUserConversions 
} from '../controllers/conversionController.js';

const router = express.Router();
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

router.post(
  '/convert', 
  protect, 
  upload.single('file'), 
  convertPDF
);

router.get('/status/:id', protect, getConversionStatus);
router.get('/history', protect, getUserConversions);

export default router;