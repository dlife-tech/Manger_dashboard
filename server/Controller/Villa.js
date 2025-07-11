const Villa = require('../Model/Villa');

// GET all Villa records
const getAllVillas = async (req, res) => {
  try {
    const data = await Villa.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching villa data");
  }
};

// POST a new Villa registration
const postVilla = async (req, res) => {
  try {
    const body = req.body;
    const data = await Villa.create(body);
    res.json("Villa data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving villa data");
  }
};

// DELETE a Villa by ID
const deleteVilla = async (req, res) => {
  try {
    const id = req.params.id;
    await Villa.deleteOne({ _id: id });
    res.json("Villa data deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error deleting villa data");
  }
};

// UPDATE a Villa by ID
const updateVilla = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Villa.updateOne({ _id: id }, { $set: body });
    res.json("Villa data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating villa data");
  }
};

module.exports = {
  getAllVillas,
  postVilla,
  deleteVilla,
  updateVilla,
};
