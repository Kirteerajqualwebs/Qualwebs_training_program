
import Case from "../models/Case.js";
import mongoose from "mongoose";

// Get All Cases 
export const getCases = async (req, res) => {
  try {
    const cases = await Case.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cases.length,
      cases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Case 
export const getCaseById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid case ID",
      });
    }

    const caseData = await Case.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      case: caseData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Case
export const createCase = async (req, res) => {
  try {
    const { clientName, email, phone, title, description } = req.body;

    const newCase = await Case.create({
      clientName,
      email,
      phone,
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Case created successfully",
      case: newCase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Case (Only Owner)
export const updateCase = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid case ID",
      });
    }

    const { clientName, email, phone, title, description, status } = req.body;

    const updatedCase = await Case.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      {
        $set: {
          ...(clientName !== undefined && { clientName }),
          ...(email !== undefined && { email }),
          ...(phone !== undefined && { phone }),
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(status !== undefined && { status }),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case updated successfully",
      case: updatedCase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Case (Only Owner)
export const deleteCase = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid case ID",
      });
    }

    const deletedCase = await Case.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!deletedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
