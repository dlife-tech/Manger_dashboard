const express = require("express");
const router = express.Router();
const {
  getAllApartHotels,
  postApartHotel,
  deleteApartHotel,
  updateApartHotel
} = require("../Controller/Apart_hotel.js");

// 🔹 GET all Apart Hotels
router.get("/", getAllApartHotels);

// 🔹 POST new Apart Hotel
router.post("/", postApartHotel);

// 🔹 DELETE Apart Hotel by ID
router.delete("/:id", deleteApartHotel);

// 🔹 Patch (Update) Apart Hotel by ID
router.patch("/:id", updateApartHotel);

module.exports = router;
