import express from "express";

import {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} from "../controllers/caseController.js";

import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Get all cases
router.get("/", getCases);

// Get single case
router.get("/:id", getCaseById);

// Create case
router.post("/", createCase);

// Update case
router.put("/:id", updateCase);

// Delete case
router.delete("/:id", deleteCase);

export default router;