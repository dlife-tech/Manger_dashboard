const mongoose = require("mongoose");

const homestaySchema = new mongoose.Schema({
  // Step 1: Owner Info
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
  homestay_name: {
    type: String,
    required: true,
  },

  // Step 2: Homestay Details
  room_count: {
    type: Number,
    required: true,
  },
  homestay_types: {
    type: [String], // e.g. ["Traditional", "Eco-Friendly"]
    required: true,
  },
  furnishing: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], // e.g. ["WiFi", "Parking", "Kitchen"]
    required: true,
  },
  homestay_images: {
    type: [String], // base64 image strings
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // Address Info
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

});

Homestay = mongoose.model("Homestay", homestaySchema);

module.exports = Homestay