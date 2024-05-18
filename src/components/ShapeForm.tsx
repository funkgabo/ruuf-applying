"use client";
import React, { useState } from "react";

interface FormState {
  shape: "cuadrado" | "triángulo";
  height: number;
  length: number;
  quadrilateralHeight: number;
  quadrilateralLength: number;
}

const ShapeForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    shape: "cuadrado",
    height: 0,
    length: 0,
    quadrilateralHeight: 0,
    quadrilateralLength: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { shape, height, length, quadrilateralHeight, quadrilateralLength } =
      formState;
    let areaBigShape: number;
    let areaSmallShape: number;
    let fit: boolean;

    if (shape === "cuadrado") {
      areaBigShape = height * length;
    } else {
      areaBigShape = (height * length) / 2;
    }

    areaSmallShape = quadrilateralHeight * quadrilateralLength;
    fit = areaBigShape >= areaSmallShape;
    setResult(
      fit ? "Sí, cabe(n) cuadrilátero(s)." : "No, no cabe ningún cuadrilátero."
    );

    if (fit) {
      const count = Math.floor(areaBigShape / areaSmallShape);
      setCount(count);
    } else {
      setCount(0);
    }
  };

  return (
    <form className="text-black flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="shape">
          Figura:
        </label>
        <select name="shape" value={formState.shape} onChange={handleChange}>
          <option value="cuadrado">Cuadrado</option>
          <option value="triángulo">Triángulo</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="height">
          Altura:
        </label>
        <input
          min="0"
          type="number"
          name="height"
          value={formState.height}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="length">
          Longitud:
        </label>
        <input
          min="0"
          type="number"
          name="length"
          value={formState.length}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="quadrilateralHeight">
          Otra Altura:
        </label>
        <input
          min="0"
          type="number"
          name="quadrilateralHeight"
          value={formState.quadrilateralHeight}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white" htmlFor="quadrilateralLength">
          Otra Longitud:
        </label>
        <input
          min="0"
          type="number"
          name="quadrilateralLength"
          value={formState.quadrilateralLength}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calcular
      </button>
      {result && <p className="text-white">{result}</p>}
      {count !== null && (
        <p className="text-white">Número de cuadriláteros que caben: {count}</p>
      )}
    </form>
  );
};

export default ShapeForm;
