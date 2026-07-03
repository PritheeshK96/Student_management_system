import dbConnect from '../../config/db.js';
import Student from '../../models/Student.js';
import { withAuth } from '../middleware/authMiddleware.js';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, error: 'Student ID parameter is required' });
  }

  // GET: Fetch student details (useful for editing)
  if (req.method === 'GET') {
    try {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found' });
      }
      return res.status(200).json({ success: true, student });
    } catch (error) {
      console.error('GET Student by ID Error:', error);
      return res.status(500).json({ success: false, error: 'Server error retrieving student details' });
    }
  }

  // PUT: Update student record (Department, Year, Email, Phone)
  if (req.method === 'PUT') {
    try {
      const { department, year, email, phone } = req.body;

      if (!department || !year || !email || !phone) {
        return res.status(400).json({ success: false, error: 'All fields (Department, Year, Email, Phone) are required' });
      }

      const allowedDepts = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'];
      if (!allowedDepts.includes(department)) {
        return res.status(400).json({ success: false, error: 'Invalid department value' });
      }

      const student = await Student.findByIdAndUpdate(
        id,
        { department, year, email, phone },
        { new: true, runValidators: true }
      );

      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found to update' });
      }

      return res.status(200).json({ success: true, student });
    } catch (error) {
      console.error('PUT Student Error:', error);
      return res.status(500).json({ success: false, error: 'Server error updating student details' });
    }
  }

  // DELETE: Delete student record permanently
  if (req.method === 'DELETE') {
    try {
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res.status(404).json({ success: false, error: 'Student not found to delete' });
      }
      return res.status(200).json({ success: true, message: 'Student record deleted successfully' });
    } catch (error) {
      console.error('DELETE Student Error:', error);
      return res.status(500).json({ success: false, error: 'Server error deleting student record' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
}

export default withAuth(handler);
