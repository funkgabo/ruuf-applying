import express from "express";
import mongoose, { Document, Schema } from "mongoose";

interface FormState extends Document {
  shape: "cuadrado" | "triángulo";
  height: number;
  length: number;
  quadrilateralHeight: number;
  quadrilateralLength: number;
  count: number;
}

const formStateSchema = new Schema<FormState>({
  shape: { type: String, required: true },
  height: { type: Number, required: true },
  length: { type: Number, required: true },
  quadrilateralHeight: { type: Number, required: true },
  quadrilateralLength: { type: Number, required: true },
  count: { type: Number, required: true },
});

const Calculation = mongoose.model<FormState>("Calculation", formStateSchema);

const router = express.Router();

// Get all calculations
router.get("/", async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.status(200).json(calculations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calculations" });
  }
});

// Create a new calculation
router.post("/", async (req, res) => {
  const {
    shape,
    height,
    length,
    quadrilateralHeight,
    quadrilateralLength,
    count,
  } = req.body;

  const newCalculation = new Calculation({
    shape,
    height,
    length,
    quadrilateralHeight,
    quadrilateralLength,
    count,
  });

  try {
    const savedCalculation = await newCalculation.save();
    res.status(201).json(savedCalculation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create calculation" });
  }
});

export default router;
