const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
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

    // Send the response with the token and redirectPath based on userType
    const redirectPath = `/${userType}/dashboard`;
    res.status(200).json({ token, redirectPath });
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
