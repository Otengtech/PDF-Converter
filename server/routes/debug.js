import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    mongodb_uri_set: !!process.env.MONGODB_URI,
    mongodb_status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    client_url: process.env.CLIENT_URL,
    jwt_secret_set: !!process.env.JWT_SECRET,
    email_user_set: !!process.env.EMAIL_USER,
    timestamp: new Date().toISOString()
  });
});

export default router;