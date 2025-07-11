// routes/hostelRoutes.js

const express = require('express');
const router = express.Router();
const {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
} = require('../Controller/Hostel');

// Create a new hostel
router.post('/', createHostel);

// Get all hostels
router.get('/', getAllHostels);

// Get a single hostel by ID
router.get('/:id', getHostelById);

// Update a hostel by ID
router.patch('/:id', updateHostel);

// Delete a hostel by ID
router.delete('/:id', deleteHostel);

module.exports = router;
