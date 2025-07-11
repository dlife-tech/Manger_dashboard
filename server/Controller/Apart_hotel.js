const ApartHotel = require("../Model/Apart_hotel");

// 🔹 Get all ApartHotel records
const getAllApartHotels = async (req, res) => {
  try {
    const data = await ApartHotel.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching ApartHotel records:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Create new ApartHotel record
const postApartHotel = async (req, res) => {
  try {
    const body = req.body;
    await ApartHotel.create(body);
    res.json({ message: "Apart Hotel data saved successfully" });
  } catch (err) {
    console.error("Error saving ApartHotel data:", err);
    res.status(500).json({ message: "Error saving data" });
  }
};

// 🔹 Delete ApartHotel by ID
const deleteApartHotel = async (req, res) => {
  try {
    const id = req.params.id;
    await ApartHotel.deleteOne({ _id: id });
    res.json({ message: "Apart Hotel deleted successfully" });
  } catch (err) {
    console.error("Error deleting ApartHotel:", err);
    res.status(500).json({ message: "Error deleting data" });
  }
};

// 🔹 Update ApartHotel by ID
const updateApartHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await ApartHotel.updateOne({ _id: id }, { $set: body });
    res.json({ message: "Apart Hotel updated successfully" });
  } catch (err) {
    console.error("Error updating ApartHotel:", err);
    res.status(500).json({ message: "Error updating data" });
  }
};

module.exports = {
  getAllApartHotels,
  postApartHotel,
  deleteApartHotel,
  updateApartHotel,
};
