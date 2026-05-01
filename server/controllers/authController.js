const userModel = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
        if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const userData = await userModel.getUserWithPasswordByUsername(username);
    // const idData = await userModel.getUserIdByUsername(username);
    // if (!idData || !idData.id) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // const userID = idData.id;
    // const passwordData = await userModel.getUserPasswordById(userID);
    // const userPassword = passwordData ? passwordData.password : null;
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if ( !userData.password || userData.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
// its not need to be hear
    // const user = await userModel.getUserById(userData.id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    res.json({
      message: "Login successful",
      user: userData,
    });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };
