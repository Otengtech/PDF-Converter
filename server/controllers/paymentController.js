import axios from 'axios';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import { sendPaymentConfirmation } from '../utils/emailService.js';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = 'https://api.paystack.co';

// Plan prices in GHS
const PLANS = {
  pro: {
    monthly: 50, // GHS 50
    yearly: 480  // GHS 480 (20% discount)
  },
  enterprise: {
    monthly: 150, // GHS 150
    yearly: 1440  // GHS 1440 (20% discount)
  }
};

// @desc    Initialize payment
// @route   POST /api/payments/initialize
export const initializePayment = async (req, res) => {
  try {
    const { plan, billingCycle } = req.body;
    const user = req.user;

    const amount = PLANS[plan][billingCycle] * 100; // Paystack uses kobo/cent (multiply by 100)
    
    // Initialize transaction with Paystack
    const response = await axios.post(
      `${PAYSTACK_API}/transaction/initialize`,
      {
        email: user.email,
        amount,
        currency: 'GHS',
        metadata: {
          userId: user._id.toString(),
          plan,
          billingCycle
        },
        callback_url: `${process.env.CLIENT_URL}/payment/verify`
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Create payment record
    await Payment.create({
      user: user._id,
      paystackReference: response.data.data.reference,
      amount: amount / 100,
      currency: 'GHS',
      plan,
      status: 'pending',
      metadata: {
        plan,
        billingCycle
      }
    });

    res.json({
      authorizationUrl: response.data.data.authorization_url,
      reference: response.data.data.reference
    });
  } catch (error) {
    console.error('Payment initialization error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Payment initialization failed' });
  }
};

// @desc    Verify payment
// @route   GET /api/payments/verify/:reference
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    // Verify with Paystack
    const response = await axios.get(
      `${PAYSTACK_API}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const { data } = response.data;

    if (data.status === 'success') {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { paystackReference: reference },
        {
          status: 'success',
          paidAt: new Date(),
          paystackCustomerCode: data.customer.customer_code
        },
        { new: true }
      );

      if (payment) {
        // Update user subscription
        const user = await User.findById(payment.user);
        
        const expiresAt = new Date();
        if (payment.metadata.billingCycle === 'monthly') {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }

        user.subscription.plan = payment.plan;
        user.subscription.expiresAt = expiresAt;
        user.subscription.conversionsLimit = payment.plan === 'pro' ? 1000 : 5000;
        user.subscription.paystackCustomerCode = data.customer.customer_code;
        user.subscription.paystackSubscriptionId = data.subscription?.subscription_code;
        await user.save();

        // Send confirmation email
        await sendPaymentConfirmation(
          user.email,
          user.name,
          payment.plan,
          payment.amount
        );

        res.json({ 
          success: true, 
          message: 'Payment verified successfully',
          user
        });
      } else {
        res.status(404).json({ message: 'Payment record not found' });
      }
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

// @desc    Handle Paystack webhook
// @route   POST /api/payments/webhook
export const handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    // Verify webhook signature (implement in production)
    
    if (event.event === 'charge.success') {
      const { reference, customer, metadata } = event.data;
      
      const payment = await Payment.findOneAndUpdate(
        { paystackReference: reference },
        {
          status: 'success',
          paidAt: new Date(),
          paystackCustomerCode: customer.customer_code
        }
      );

      if (payment) {
        const user = await User.findById(payment.user);
        
        const expiresAt = new Date();
        if (payment.metadata.billingCycle === 'monthly') {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }

        user.subscription.plan = payment.plan;
        user.subscription.expiresAt = expiresAt;
        user.subscription.conversionsLimit = payment.plan === 'pro' ? 1000 : 5000;
        user.subscription.paystackCustomerCode = customer.customer_code;
        await user.save();

        await sendPaymentConfirmation(
          user.email,
          user.name,
          payment.plan,
          payment.amount
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
};