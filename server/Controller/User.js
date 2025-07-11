let Users = require('../Model/User')

let getAllUsers = async (req,res)=>{
    let data = await Users.find();
    res.json(data)
}

let postUser = async (req,res)=>{
    let body = req.body
    let data = await Users.insertOne(body);
    res.json("data save")
}
module.exports = {
    getAllUsers,
    postUser
}