const mongoose = require('mongoose');


// Model export



const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    required: true, 
    enum: ['citizen', 'law-enforcement', 'municipal-authorities', 'user']  // Add 'user' if needed
  },
});

module.exports = mongoose.model('User', userSchema);