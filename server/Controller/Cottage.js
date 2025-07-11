const Cottage = require('../Model/Cottage');

// GET: Fetch all cottage records
const getAllCottages = async (req, res) => {
  try {
    const data = await Cottage.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching cottages:", err);
    res.status(500).json("Error fetching cottages");
  }
};

// POST: Create a new cottage
const postCottage = async (req, res) => {
  try {
    const body = req.body;
    await Cottage.create(body);
    res.json("Cottage registered successfully");
  } catch (err) {
    console.error("Error creating cottage:", err);
    res.status(500).json("Error saving cottage");
  }
};

// DELETE: Delete a cottage by ID
const deleteCottage = async (req, res) => {
  try {
    const id = req.params.id;
    await Cottage.deleteOne({ _id: id });
    res.json("Cottage deleted successfully");
  } catch (err) {
    console.error("Error deleting cottage:", err);
    res.status(500).json("Error deleting cottage");
  }
};

// PUT: Update a cottage by ID
const updateCottage = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Cottage.updateOne({ _id: id }, { $set: body });
    res.json("Cottage updated successfully");
  } catch (err) {
    console.error("Error updating cottage:", err);
    res.status(500).json("Error updating cottage");
  }
};

module.exports = {
  getAllCottages,
  postCottage,
  deleteCottage,
  updateCottage,
};
