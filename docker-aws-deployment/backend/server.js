
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const publicPath = path.join(__dirname, "public");

app.use(cors());
// Backend API
app.get("/api", (req, res) => {
  res.json({
    message: "Backend is working successfully!"
  });
});

// Serve React static files
app.use(express.static(publicPath));

// React Router fallback
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
