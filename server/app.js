const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const albumRoutes = require("./routes/albumRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', message: 'NEXA API is running' }));
app.use('/auth', authRoutes);
app.use("/todos", todoRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/albums", albumRoutes);
app.use("/photos", photoRoutes);
module.exports = app;
