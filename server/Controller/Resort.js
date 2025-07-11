let Resort = require('../Model/Resort');

// Get all data 
let GetAllresort = async (req, res) => {
  let data = await Resort.find();
  res.json(data);
};

let postresort = async (req, res) => {
  try {
    const body = req.body;
    const data = await Resort.create(body); 
    res.json("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
};


// delete resort records 

let deleteresort = async (req, res) => {
  try {
    const id = req.params.id
    let data = await Resort.deleteOne({ _id: id })
    res.json("Data Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}


let updateResort = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let result = await Resort.updateOne({ _id: id }, { $set: body });
    res.json("Data Updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}




module.exports = {
  GetAllresort,
  postresort,
  deleteresort,
  updateResort,
};
