import Conversion from '../models/Conversion.js';
import User from '../models/User.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// Using a free PDF API (replace with your preferred API)
const PDF_API_KEY = process.env.VITE_PDF_API_KEY;
const PDF_API_URL = 'https://api.pdf.co/v1/pdf/convert';

// @desc    Convert PDF
// @route   POST /api/conversions/convert
export const convertPDF = async (req, res) => {
  try {
    const { toFormat } = req.body;
    const user = req.user;

    // Check conversion limit
    if (user.subscription.conversionsUsed >= user.subscription.conversionsLimit) {
      return res.status(403).json({ 
        message: 'Conversion limit reached. Please upgrade your plan.',
        limitReached: true
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create conversion record
    const conversion = await Conversion.create({
      user: user._id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      toFormat,
      status: 'processing'
    });

    // Update conversion count
    user.subscription.conversionsUsed += 1;
    await user.save();

    // Here you would call the actual PDF conversion API
    // For demonstration, we'll simulate a successful conversion
    setTimeout(async () => {
      conversion.status = 'completed';
      conversion.outputUrl = 'https://example.com/converted-file.docx';
      conversion.completedAt = new Date();
      await conversion.save();
    }, 3000);

    res.json({
      message: 'Conversion started',
      conversionId: conversion._id
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ message: 'Conversion failed' });
  }
};

// @desc    Get conversion status
// @route   GET /api/conversions/:id
export const getConversionStatus = async (req, res) => {
  try {
    const conversion = await Conversion.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!conversion) {
      return res.status(404).json({ message: 'Conversion not found' });
    }

    res.json(conversion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user conversions
// @route   GET /api/conversions
export const getUserConversions = async (req, res) => {
  try {
    const conversions = await Conversion.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(50);

    res.json(conversions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};