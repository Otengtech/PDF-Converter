import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  verifyEmail, 
  requestLoginCode, 
  verifyLoginCode,
  getMe 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  register
);

router.get('/verify/:token', verifyEmail);

router.post(
  '/login-code',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  requestLoginCode
);

router.post(
  '/verify-code',
  [
    body('email').isEmail(),
    body('code').isLength({ min: 6, max: 6 }).withMessage('Invalid code')
  ],
  verifyLoginCode
);

router.get('/me', protect, getMe);

export default router;