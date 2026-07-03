import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  }
}, {
  timestamps: true
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
