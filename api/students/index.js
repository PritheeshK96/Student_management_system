import dbConnect from '../../config/db.js';
import Student from '../../models/Student.js';
import { withAuth } from '../middleware/authMiddleware.js';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { search, department } = req.query;
      const query = {};

      if (department) {
        query.department = department;
      }

      if (search) {
        // Regex case-insensitive search matching either name or registerNumber
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { registerNumber: { $regex: search, $options: 'i' } },
        ];
      }

      const students = await Student.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, students });
    } catch (error) {
      console.error('GET Students Error:', error);
      return res.status(500).json({ success: false, error: 'Failed to retrieve students records' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, registerNumber, department, year, email, phone } = req.body;

      // Validate presence of all fields
      if (!name || !registerNumber || !department || !year || !email || !phone) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
      }

      // Validate department enum
      const allowedDepts = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'];
      if (!allowedDepts.includes(department)) {
        return res.status(400).json({ success: false, error: 'Invalid department select option' });
      }

      // Check if student already exists with this registerNumber
      const duplicateStudent = await Student.findOne({ registerNumber });
      if (duplicateStudent) {
        return res.status(400).json({
          success: false,
          error: `Student with register number "${registerNumber}" already exists`,
        });
      }

      const student = await Student.create({
        name,
        registerNumber,
        department,
        year,
        email,
        phone,
      });

      return res.status(201).json({ success: true, student });
    } catch (error) {
      console.error('POST Student Error:', error);
      return res.status(500).json({ success: false, error: 'Failed to add student record' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
