const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, userType });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    // Find the user by email and userType
    const user = await User.findOne({ email, userType });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, redirectPath: `/${userType}/dashboard` });  // Optionally, send a redirect path for the user
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');  // Clear the JWT token if stored in cookies
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
