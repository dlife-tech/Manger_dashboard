const mongoose = require("mongoose");

const villaSchema = new mongoose.Schema({
  
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
 
  villa_name: {
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
  },

  villa_count: {
    type: Number,
    required: true,
  },
  villa_types: {
    type: [String], // array of types
    required: true,
  },
  furnishing: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], // array of amenities
    required: true,
  },
  villa_images: {
    type: [String], // array of base64 strings
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}
);

let = Villa = mongoose.model("Villa", villaSchema);

module.exports = Villa