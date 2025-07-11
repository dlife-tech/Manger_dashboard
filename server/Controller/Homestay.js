const Homestay = require('../Model/Homestay');

// GET: Fetch all homestays
const getAllHomestays = async (req, res) => {
  try {
    const data = await Homestay.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching homestays:", err);
    res.status(500).json("Error fetching homestays");
  }
};

// POST: Create a new homestay
const postHomestay = async (req, res) => {
  try {
    const body = req.body;
    await Homestay.create(body);
    res.json("Homestay saved successfully");
  } catch (err) {
    console.error("Error saving homestay:", err);
    res.status(500).json("Error saving homestay");
  }
};

// DELETE: Delete a homestay by ID
const deleteHomestay = async (req, res) => {
  try {
    const id = req.params.id;
    await Homestay.deleteOne({ _id: id });
    res.json("Homestay deleted successfully");
  } catch (err) {
    console.error("Error deleting homestay:", err);
    res.status(500).json("Error deleting homestay");
  }
};

// PUT: Update a homestay by ID
const updateHomestay = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Homestay.updateOne({ _id: id }, { $set: body });
    res.json("Homestay updated successfully");
  } catch (err) {
    console.error("Error updating homestay:", err);
    res.status(500).json("Error updating homestay");
  }
};

module.exports = {
  getAllHomestays,
  postHomestay,
  deleteHomestay,
  updateHomestay,
};
