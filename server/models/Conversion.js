import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fromFormat: {
    type: String,
    default: 'pdf'
  },
  toFormat: {
    type: String,
    required: true,
    enum: ['word', 'excel', 'ppt', 'jpg', 'png']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  inputUrl: String,
  outputUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

const Conversion = mongoose.model('Conversion', conversionSchema);
export default Conversion;