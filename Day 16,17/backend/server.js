import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

async function startServer() {
  await connectDB();
  app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log("server is runing on 5000 port");
  });
}

startServer();
