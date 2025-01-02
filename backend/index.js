const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from a .env file
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;  // Use environment variable for port

// Middleware
app.use(express.json());  // Body parser middleware for JSON data
app.use(cors());  // To allow cross-origin requests
app.use('/api/auth', authRoutes);  // Mount authRoutes on the /api/auth path

// Test route to check if the API is available
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connection successful!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
