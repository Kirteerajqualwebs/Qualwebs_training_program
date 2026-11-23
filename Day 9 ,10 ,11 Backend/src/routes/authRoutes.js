const express = require("express");
const roleBasedAccess = require("../middlewares/roleBasedAccessMiddleware.js")
const router = express.Router();

const { register } = require("../controllers/authController");
const login = require("../controllers/loginController");

// Register API
router.post("/register",  register);
router.post("/login" , login)

module.exports = router;