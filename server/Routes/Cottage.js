const express = require("express");
const router = express.Router();

const {
  getAllCottages,
  postCottage,
  deleteCottage,
  updateCottage,
} = require("../Controller/Cottage");

// GET all cottages
router.get("/", getAllCottages);

// POST new cottage
router.post("/", postCottage);

// DELETE a cottage by ID
router.delete("/:id", deleteCottage);

// PUT (update) a cottage by ID
router.patch("/:id", updateCottage);

module.exports = router;
