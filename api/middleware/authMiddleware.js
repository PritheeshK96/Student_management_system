import jwt from 'jsonwebtoken';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforstudentmanagementsystem123!');
      
      req.admin = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
    }
  };
}
