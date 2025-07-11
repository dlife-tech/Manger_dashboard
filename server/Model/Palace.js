const mongoose = require("mongoose");

const palaceSchema = new mongoose.Schema({
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
    required: true
  },
  
  palace_name: {
    type: String,
    required: true
  },
  room_count: {
    type: String,
    required: true
  },
  palace_types: {
    type: [String],
    required: true
  },
  furnishing: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  place_images: {
    type: [String], // Base64 strings
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
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
})
const Palace = mongoose.model("Palace", palaceSchema);
module.exports = Palace;