import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Get user subscription
// @route   GET /api/users/subscription
router.get('/subscription', protect, async (req, res) => {
  try {
    res.json(req.user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name } = req.body;
    
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    
    await user.save();
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;