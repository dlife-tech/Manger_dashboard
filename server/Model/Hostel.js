// models/Hostel.js
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  
  hostel_name: {
    type: String,
    required: true,
    trim: true,
  },
  hostel_count: {
    type: Number,
    required: true,
  },
  hostel_types: {
    type: [String], // Example: ["Boys", "Girls", "Mixed"]
    default: [],
  },
  furnishing: {
    type: String, // Example: "Furnished", "Semi-Furnished"
    required: true,
  },
  amenities: {
    type: [String], // Example: ["WiFi", "Parking", "Laundry"]
    default: [],
  },
  hostel_images: {
    type: [String], // Base64 strings or image URLs
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

Hostel = mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;