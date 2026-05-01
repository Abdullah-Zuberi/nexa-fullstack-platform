const userModel = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const userData = await userModel.getUserWithPasswordByUsername(username);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!userData.password || userData.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: userData,
    });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    res.json({ available: true });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, name, email, phone, address, company } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const userInsertData = {
      username,
      name,
      email,
      phone,
      street: address.street,
      suite: address.suite,
      city: address.city,
      zipcode: address.zipcode,
      lat: address.geo.lat,
      lng: address.geo.lng,
      companyName: company.name,
      catchPhrase: company.catchPhrase,
      bs: company.bs,
    };

    const userId = await userModel.createUser(userInsertData);
    await userModel.createUserPassword(userId, password);
    const createdUser = await userModel.getUserById(userId);

    if (!createdUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    res.status(201).json({ message: "Registration successful", user: createdUser });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login, checkUsername, register };
