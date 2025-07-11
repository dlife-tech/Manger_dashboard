let Lodge = require('../Model/Lodge')

let GetAlllodge = async (req,res)=>{
    let data = await Lodge.find()
    res.json(data)

}

let postLodge = async (req, res) => {
  try {
    const body = req.body;
    const data = await Lodge.create(body); 
    res.json("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
};


// delete lodge records 

let deletelodge = async (req, res) => {
  try {
    const id = req.params.id
    let data = await Lodge.deleteOne({ _id: id })
    res.json("Data Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}


let updatelodge = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let result = await Lodge.updateOne({ _id: id }, { $set: body });
    res.json("Data Updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Error saving data");
  }
}




module.exports = {
  GetAlllodge,
  postLodge,
  deletelodge,
  updatelodge,
};

