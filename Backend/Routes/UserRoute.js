const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema');
const authMiddleware = require('../Middleware/authmiddleware')
const dotenv = require('dotenv');
dotenv.config();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  // Basic validations
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user', // if role is not provided, default to 'user'
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const payload = {
    user: {
      id: user._id,
      role: user.role,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    message: 'User logged in successfully',
    token,
    userId: user._id,
    username: user.username,
    role: user.role,
  });
});

// routes for updating password
router.post('/update-password', authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id); // Assuming `req.user.id` contains authenticated user's ID

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;