let Palace = require('../Model/Palace');

// Get all Palace records
let GetAllPalace = async (req, res) => {
  try {
    let data = await Palace.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching data");
  }
};

// Post new Palace record
let postPalace = async (req, res) => {
  try {
    const body = req.body;
    const data = await Palace.create(body);
    res.json("Palace data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
};

// Delete Palace record by ID
let deletePalace = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await Palace.deleteOne({ _id: id });
    res.json("Palace data deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error deleting data");
  }
};

// Update Palace record by ID
let updatePalace = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let result = await Palace.updateOne({ _id: id }, { $set: body });
    res.json("Palace data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating data");
  }
};

module.exports = {
  GetAllPalace,
  postPalace,
  deletePalace,
  updatePalace,
};
