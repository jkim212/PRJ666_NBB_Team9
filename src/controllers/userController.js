const user = require("../models/user");

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  try {
    const userInfo = await user.findOne({ _id: id });
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserbyId = async (req, res) => { 
  const id = req.params.id;
 
  
  try {
    const userInfo = await user.findOne({ _id: id });
   
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getUserInfo,getUserbyId };