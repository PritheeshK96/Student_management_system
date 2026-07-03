import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
  },
  registerNumber: {
    type: String,
    required: [true, 'Please provide register number'],
    unique: true,
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    enum: ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'],
  },
  year: {
    type: String,
    required: [true, 'Please provide student year'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  }
}, {
  timestamps: true
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
