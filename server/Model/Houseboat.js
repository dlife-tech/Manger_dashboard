const mongoose = require("mongoose");

const houseboatSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },

  houseboat_name: {
    type: String,
    required: true
  },
  houseboat_count: {
    type: String,
    required: true
  },
   houseboat_types: {
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
  houseboat_images: {
    type: [String], // Base64 encoded images
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
  }
});

const Houseboat = mongoose.model("Houseboat", houseboatSchema);
module.exports = Houseboat;
