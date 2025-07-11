const mongoose = require('mongoose');

const GuestHouseSchema = new mongoose.Schema({
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
  
   guest_house_name: {
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
  guesthouse_types: {
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
  guesthouse_images: {
    type: [String], // Array of base64 image strings
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  propertyType: {
    type: String,
    default: "Guest House"
  }
});

const GuestHouse= mongoose.model("GuestHouse", GuestHouseSchema);
module.exports = GuestHouse;
