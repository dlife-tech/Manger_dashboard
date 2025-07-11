const GuestHouse = require('../Model/Guesthouse'); // Adjust path if needed

// GET all guest houses
const getAllGuestHouses = async (req, res) => {
  try {
    const data = await GuestHouse.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching data");
  }
};

// POST a new guest house
const postGuestHouse = async (req, res) => {
  try {
    const body = req.body;
    const data = await GuestHouse.create(body);
    res.json("Guest House saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
};

// DELETE a guest house by ID

let deleteGuestHouse = async (req, res) => {
  try {
    const id = req.params.id
    let data = await GuestHouse.deleteOne({ _id: id })
    res.json("Data Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}


// UPDATE a guest house by ID


let updateGuestHouse = async (req, res) => {
    try {
      let id = req.params.id;
      let body = req.body;
      let result = await GuestHouse.updateOne({ _id: id }, { $set: body });
      res.json("Data Updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json("Error saving data");
    }
  }

module.exports = {
  getAllGuestHouses,
  postGuestHouse,
  deleteGuestHouse,
  updateGuestHouse
};
