const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
  apartment_name: {
    type: String,
    required: true,
  },
  apartment_count: {
    type: Number,
    required: true,
  },
  apartment_types: {
    type: [String], // e.g., ["1BHK", "2BHK", "Studio"]
    default: [],
  },
  furnishing: {
    type: String, // e.g., "Furnished", "Unfurnished"
    required: true,
  },
 
  amenities: {
    type: [String], // e.g., ["WiFi", "Elevator", "Security"]
    default: [],
  },
  apartment_images: {
    type: [String], // base64 image strings
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
  }
}, {
  timestamps: true
});

let Apartment = mongoose.model("Apartment", ApartmentSchema);
module.exports = Apartment