const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema'); // Assuming you have a User model
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // replace 'yourSecretKey' with your actual secret key
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    req.user = user; // Attach user to the request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;