import { Router } from "express";
import mongoose from "mongoose";

// Define el esquema y modelo de Mongoose
const calculationSchema = new mongoose.Schema({
  shape: String,
  height: Number,
  length: Number,
  quadrilateralHeight: Number,
  quadrilateralLength: Number,
  count: Number,
});

const Calculation = mongoose.model("Calculation", calculationSchema);

const router = Router();

// Endpoint para obtener todos los cálculos
router.get("/", async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.json(calculations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para agregar un nuevo cálculo
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para borrar todos los cálculos
router.delete("/", async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
