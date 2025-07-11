const Apartment = require("../Model/Apartment.js");

// 🔹 Get all apartments
const getAllApartments = async (req, res) => {
  try {
    const data = await Apartment.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
};

// 🔹 Post new apartment
const postApartment = async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);
    await newApartment.save();
    res.json({ message: "Apartment data saved successfully" });
  } catch (error) {
    console.error("Error saving apartment:", error);
    res.status(500).json({ error: "Failed to save apartment" });
  }
};

// 🔹 Delete apartment by ID
const deleteApartment = async (req, res) => {
  try {
    const id = req.params.id;
    await Apartment.deleteOne({ _id: id });
    res.json({ message: "Apartment data deleted successfully" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ error: "Failed to delete apartment" });
  }
};

// 🔹 Update apartment by ID
const updateApartment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    await Apartment.updateOne({ _id: id }, { $set: updatedData });
    res.json({ message: "Apartment data updated successfully" });
  } catch (error) {
    console.error("Error updating apartment:", error);
    res.status(500).json({ error: "Failed to update apartment" });
  }
};

module.exports = {
  getAllApartments,
  postApartment,
  deleteApartment,
  updateApartment,
};
