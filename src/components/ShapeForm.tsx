"use client";
import React, { useState } from "react";
import { SavedResults } from "./SavedResults";
import { FormState, FormResult } from "../interfaces/interfaces";
import resultsStore from "@/store/global";

const ShapeForm: React.FC = () => {
  const addResultToDB = resultsStore((state) => state.addResultToDB);
  const deleteAll = resultsStore((state) => state.deleteAll);

  const [formState, setFormState] = useState<FormState>({
    shape: "cuadrado",
    height: 1,
    length: 1,
    quadrilateralHeight: 1,
    quadrilateralLength: 1,
    count: 0,
  });

  const [result, setResult] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "shape" ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { shape, height, length, quadrilateralHeight, quadrilateralLength } =
      formState;
    let areaBigShape: number;
    let areaSmallShape: number;
    let fit: boolean;

    if (shape === "cuadrado") {
      areaBigShape = height * length;
    } else {
      const isIsosceles = height > length;
      if (!isIsosceles) {
        setResult(
          "El triángulo no es isósceles. No se puede realizar la operación."
        );
        setCount(0);
        addResultToDB({
          quadrilateralLength: quadrilateralLength,
          quadrilateralHeight: quadrilateralHeight,
          length: length,
          height: height,
          shape,
          _id: "",
          count: 0,
        });
        return;
      }
      areaBigShape = (height * length) / 2;
    }

    areaSmallShape = quadrilateralHeight * quadrilateralLength;
    fit = areaBigShape >= areaSmallShape;
    const resultMessage = fit
      ? "Sí, cabe el cuadrilátero."
      : "No, no cabe el cuadrilátero.";
    setResult(resultMessage);

    let calculatedCount = 0;
    if (fit) {
      calculatedCount = Math.floor(areaBigShape / areaSmallShape);
      if (isNaN(calculatedCount) || !isFinite(calculatedCount)) {
        calculatedCount = 0;
      }
    } else {
      calculatedCount = 0;
    }
    setCount(calculatedCount);

    const newResult: FormResult = {
      quadrilateralLength,
      quadrilateralHeight,
      length,
      height,
      shape,
      _id: null,
      count: calculatedCount,
    };

    await addResultToDB(newResult);
  };

  const resetForm = async () => {
    await deleteAll();
    setFormState({
      shape: "cuadrado",
      height: 1,
      length: 1,
      quadrilateralHeight: 1,
      quadrilateralLength: 1,
      count: 0,
    });
  };

  return (
    <section className="flex flex-col gap-6">
      <form className="text-black flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 text-4xl rounded-xl text-center">
          <label className="text-white" htmlFor="shape">
            Forma de Techo:
          </label>
          <select
            name="shape"
            className=" text-4xl rounded-xl text-center"
            value={formState.shape}
            onChange={handleChange}
          >
            <option value="cuadrado">Cuadrado</option>
            <option value="triángulo">Triángulo</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="height">
            Altura de Techo:
          </label>
          <input
            className=" text-4xl rounded-xl text-center"
            max="1000"
            min="1"
            type="number"
            name="height"
            value={formState.height}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="length">
            Longitud de Techo:
          </label>
          <input
            className=" text-4xl rounded-xl text-center"
            max="1000"
            min="1"
            type="number"
            name="length"
            value={formState.length}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="quadrilateralHeight">
            Paneles Altura:
          </label>
          <input
            className=" text-4xl rounded-xl text-center"
            max="1000"
            min="1"
            type="number"
            name="quadrilateralHeight"
            value={formState.quadrilateralHeight}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white" htmlFor="quadrilateralLength">
            Paneles Longitud:
          </label>
          <input
            className=" text-4xl rounded-xl text-center"
            max="1000"
            min="1"
            type="number"
            name="quadrilateralLength"
            value={formState.quadrilateralLength}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Calcular y Grabar
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          Borrar Todo
        </button>
        {result && <p className="text-white">{result}</p>}
        {count !== null && (
          <p className="text-white">Número de Paneles que caben: {count}</p>
        )}
      </form>
      <SavedResults />
    </section>
  );
};

export default ShapeForm;
