const mongoose = require("mongoose");

const CottageSchema = new mongoose.Schema({
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
  
  cottage_name: {
    type: String,
    required: true,
  },
  room_count: {
    type: Number,
    required: true,
  },
  cottage_types: {
    type: [String], // e.g., ["Luxury", "Family", "Rustic"]
    default: [],
  },
  furnishing: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], // e.g., ["WiFi", "Pool", "Parking"]
    default: [],
  },
  cottage_images: {
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

Cottage = mongoose.model("Cottage", CottageSchema);
module.exports = Cottage;