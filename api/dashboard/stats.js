import dbConnect from '../../config/db.js';
import Student from '../../models/Student.js';
import { withAuth } from '../middleware/authMiddleware.js';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    await dbConnect();

    // 1. Get total students count
    const totalStudents = await Student.countDocuments();

    // 2. We have 5 predefined departments as per requirements
    const departments = ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'];

    // 3. Aggregate student counts by department
    const deptAggregates = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
        },
      },
    ]);

    // Build stats with 0 for departments with no students
    const departmentStats = departments.map((dept) => {
      const match = deptAggregates.find((item) => item._id === dept);
      return {
        department: dept,
        count: match ? match.count : 0,
      };
    });

    // 4. Get last 5 recently added students
    const recentStudents = await Student.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name registerNumber department year createdAt');

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalDepartments: departments.length,
        departmentStats,
        recentStudents,
      },
    });
  } catch (error) {
    console.error('Dashboard Stats API Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to load dashboard statistics' });
  }
}

export default withAuth(handler);
