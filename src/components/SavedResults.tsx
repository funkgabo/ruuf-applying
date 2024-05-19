import React from "react";
import { SavedResultsProps } from "../interfaces/interfaces";
import resultsStore from "@/store/global";

export const SavedResults: React.FC<SavedResultsProps> = ({ formState }) => {
  const results = resultsStore((state) => state.results);

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
      {results.map((result, index) => (
        <div className="text-white" key={index}>
          <h2>Resultado</h2>
          <span className="text-yellow-400">Panel(es) {result.count}</span>
          <p>Techo: {result.formState.shape}</p>
          <p>Altura de Techo: {result.formState.height}</p>
          <p>Longitud de Techo: {result.formState.length}</p>
          <p>Altura Panel(es): {result.formState.quadrilateralHeight}</p>
          <p>Longitud Panel(es): {result.formState.quadrilateralLength}</p>
        </div>
      ))}
    </div>
  );
};
