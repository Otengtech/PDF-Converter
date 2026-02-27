import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  initializePayment, 
  verifyPayment,
  handleWebhook 
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initialize', protect, initializePayment);
router.get('/verify/:reference', protect, verifyPayment);
router.post('/webhook', express.raw({type: 'application/json'}), handleWebhook);

export default router;