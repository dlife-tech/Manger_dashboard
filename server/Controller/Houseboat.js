const Houseboat = require('../Model/Houseboat');

// Get all houseboats
const getAllHouseboats = async (req, res) => {
  try {
    const data = await Houseboat.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching houseboats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new houseboat
const createHouseboat = async (req, res) => {
  try {
    const body = req.body;
    await Houseboat.create(body);
    res.json("Houseboat data saved successfully");
  } catch (err) {
    console.error("Error saving houseboat:", err);
    res.status(500).json({ error: "Error saving data" });
  }
};

// Delete a houseboat by ID
const deleteHouseboat = async (req, res) => {
  try {
    const id = req.params.id;
    await Houseboat.deleteOne({ _id: id });
    res.json("Houseboat deleted successfully");
  } catch (err) {
    console.error("Error deleting houseboat:", err);
    res.status(500).json({ error: "Error deleting data" });
  }
};

// Update a houseboat by ID
const updateHouseboat = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Houseboat.updateOne({ _id: id }, { $set: body });
    res.json("Houseboat updated successfully");
  } catch (err) {
    console.error("Error updating houseboat:", err);
    res.status(500).json({ error: "Error updating data" });
  }
};

module.exports = {
  getAllHouseboats,
  createHouseboat,
  deleteHouseboat,
  updateHouseboat,
};
