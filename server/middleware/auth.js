import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const checkSubscription = (requiredPlan) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      if (requiredPlan === 'pro' && user.subscription.plan === 'free') {
        return res.status(403).json({ 
          message: 'Pro plan required',
          required: 'pro'
        });
      }

      if (requiredPlan === 'enterprise' && !['pro', 'enterprise'].includes(user.subscription.plan)) {
        return res.status(403).json({ 
          message: 'Enterprise plan required',
          required: 'enterprise'
        });
      }

      // Check if subscription is expired
      if (user.subscription.expiresAt && new Date() > user.subscription.expiresAt) {
        user.subscription.plan = 'free';
        user.subscription.conversionsLimit = 5;
        await user.save();
        return res.status(403).json({ message: 'Subscription expired' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};