// controllers/hostelController.js

const Hostel = require('../Model/Hostel');

// CREATE a new hostel entry
const createHostel = async (req, res) => {
  try {
    const newHostel = new Hostel(req.body);
    await newHostel.save();
    res.status(201).json({ message: 'Hostel registered successfully', data: newHostel });
  } catch (error) {
    res.status(400).json({ message: 'Error creating hostel', error: error.message });
  }
};

// GET all hostels
const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hostels', error: error.message });
  }
};

// GET a single hostel by ID
const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hostel', error: error.message });
  }
};

// UPDATE hostel by ID
const updateHostel = async (req, res) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedHostel) {
      return res.status(404).json({ message: 'Hostel not found for update' });
    }
    res.status(200).json({ message: 'Hostel updated successfully', data: updatedHostel });
  } catch (error) {
    res.status(400).json({ message: 'Error updating hostel', error: error.message });
  }
};

// DELETE hostel by ID
const deleteHostel = async (req, res) => {
  try {
    const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!deletedHostel) {
      return res.status(404).json({ message: 'Hostel not found for deletion' });
    }
    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hostel', error: error.message });
  }
};

module.exports = {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deleteHostel,
};
