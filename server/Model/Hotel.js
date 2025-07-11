const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
 
  hotel_name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  hotel_types: {
    type: [String], // Array of hotel type strings
    required: true
  },
  furnishing: {
    type: String,
    required: true
  },
  amenities: {
    type: [String], // Array of selected amenities
    required: true
  },
  room_count: {
    type: Number,
    required: true
  },
  hotel_images: {
    type: [String], // Array of base64 image strings
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  propertyType: {
    type: String,
    default: "Hotel"
  }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
