import dbConnect from '../../config/db.js';
import Admin from '../../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    await dbConnect();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    // Check if any admin exists in the database.
    // If not, seed a default admin using environment variables or fallback values.
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const seedUsername = process.env.ADMIN_USERNAME || 'admin';
      const seedPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(seedPassword, salt);

      await Admin.create({
        username: seedUsername.toLowerCase(),
        password: hashedPassword,
      });
      console.log('Successfully seeded default administrator account.');
    }

    // Find the admin user
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'supersecretjwtkeyforstudentmanagementsystem123!',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      token,
      admin: {
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Login Endpoint Error:', error);
    return res.status(500).json({ success: false, error: 'Server Error during login process' });
  }
}
