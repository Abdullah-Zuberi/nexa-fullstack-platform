const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
module.exports = app;