const mongoose = require("mongoose");

const apartHotelSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
 phone: {
    type: String,
    required: true,
  },

  apart_hotel_name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  apart_hotel_count: {
    type: Number,
    required: true
  },
  apart_hotel_types: {
    type: [String],
    default: []
  },
  furnishing: {
    type: String,
    required: true
  },
  
  amenities: {
    type: [String],
    default: []
  },
  apart_hotel_images: {
    type: [String], // base64 image strings
    default: []
  },
  description: {
    type: String,
    required: true
  },
  address: {
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
  }
}, {
  timestamps: true
});

ApartHotel  = mongoose.model("ApartHotel", apartHotelSchema);
module.exports = ApartHotel