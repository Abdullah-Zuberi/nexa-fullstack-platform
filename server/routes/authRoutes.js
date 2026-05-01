const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", (req, res, next) => { next();}, authController.login);
module.exports = router;
router.post("/register", (req, res, next) => { next();}, authController.register);  
