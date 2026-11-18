let express = require("express");

let healthRoute = express.Router();

healthRoute.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Medicare Api is running",
  });
});

module.exports = healthRoute;
