import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email, name, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: '"PDFlux" <noreply@pdflux.com>',
    to: email,
    subject: 'Verify Your Email - PDFlux',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Welcome to PDFlux, ${name}!</h2>
        <p style="color: #475569;">Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #f59e0b; color: white; text-decoration: none; border-radius: 50px; margin: 20px 0;">Verify Email</a>
        <p style="color: #64748b; font-size: 14px;">Or copy this link: ${verificationUrl}</p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 40px;">This link expires in 24 hours.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendLoginCode = async (email, code) => {
  const mailOptions = {
    from: '"PDFlux" <noreply@pdflux.com>',
    to: email,
    subject: 'Your Login Code - PDFlux',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Login Code</h2>
        <p style="color: #475569;">Use the following code to log in to your PDFlux account:</p>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-radius: 12px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 8px;">${code}</span>
        </div>
        <p style="color: #64748b; font-size: 14px;">This code expires in 15 minutes.</p>
        <p style="color: #94a3b8; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendPaymentConfirmation = async (email, name, plan, amount) => {
  const mailOptions = {
    from: '"PDFlux" <noreply@pdflux.com>',
    to: email,
    subject: 'Payment Confirmation - PDFlux',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Thank You for Your Payment, ${name}!</h2>
        <p style="color: #475569;">Your ${plan} plan subscription has been activated successfully.</p>
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <p style="margin: 0; color: #475569;">Amount Paid: <strong>GHS ${amount}</strong></p>
          <p style="margin: 10px 0 0; color: #475569;">Plan: <strong>${plan.charAt(0).toUpperCase() + plan.slice(1)}</strong></p>
        </div>
        <p style="color: #64748b;">You can now enjoy unlimited conversions and premium features.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};