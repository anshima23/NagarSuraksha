const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, userType } = req.body;
  
  // Log incoming request data
  console.log("Sign-Up Request Received:", req.body);

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, userType });
    const savedUser = await newUser.save();

    console.log("User saved successfully:", savedUser);

    // Generate a JWT token
    const token = jwt.sign({ userId: savedUser._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in Sign-Up:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;
  
  // Log incoming request data
  console.log("Login Request Received:", req.body);

  try {
    // Find the user by email and userType
    const user = await User.findOne({ email, userType });
    if (!user) {
      console.log("User not found for email and userType:", email, userType);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("Login successful for user:", email);

    res.status(200).json({ token, redirectPath: `/${userType}/dashboard` }); // Optionally, send a redirect path for the user
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  console.log("Logout request received");
  res.clearCookie('token'); // Clear the JWT token if stored in cookies
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
