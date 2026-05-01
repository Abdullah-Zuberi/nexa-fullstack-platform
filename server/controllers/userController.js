const userModel = require("../models/userModel");

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserById };