const Hotel = require('../Model/Hotel');

// Get all Hotels
const AllHotel = async (req, res) => {
  const data = await Hotel.find();
  res.json(data);
};

// Post a new Hotel
const postHotel = async (req, res) => {
  try {
    const body = req.body;
    const data = await Hotel.create(body);
    res.json("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
};

// delete hotel records 

let deletehotel = async (req, res) => {
  try {
    const id = req.params.id
    let data = await Hotel.deleteOne({ _id: id })
    res.json("Data Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}


let updateHotel = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let result = await Hotel.updateOne({ _id: id }, { $set: body });
    res.json("Data Updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}

module.exports = {
  AllHotel,
  postHotel,
  deletehotel,
  updateHotel
};
