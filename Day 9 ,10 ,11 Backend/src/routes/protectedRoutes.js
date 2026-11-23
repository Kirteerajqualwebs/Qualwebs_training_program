const express = require("express");
const router = express.Router();
const roleBasedAccess = require("../middlewares/roleBasedAccessMiddleware")
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, roleBasedAccess("receptionist"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

module.exports = router;