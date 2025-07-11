const express = require("express");
const router = express.Router();

const {
  getAllApartments,
  postApartment,
  deleteApartment,
  updateApartment
} = require("../Controller/Apartment.js");

// 🔹 GET all apartment records
router.get("/", getAllApartments);

// 🔹 POST a new apartment
router.post("/", postApartment);

// 🔹 DELETE an apartment by ID
router.delete("/:id", deleteApartment);

// 🔹 UPDATE an apartment by ID
router.patch("/:id", updateApartment);

module.exports = router;
