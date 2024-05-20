import React, { useEffect } from "react";
import resultsStore from "@/store/global";
import { FormState } from "../interfaces/interfaces";

interface SavedResultsProps {
  formState: FormState;
}

export const SavedResults: React.FC<SavedResultsProps> = ({ formState }) => {
  const results = resultsStore((state) => state.results);
  const fetchResults = resultsStore((state) => state.fetchResults);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
      {results.map((result, index) => (
        <div className="text-white" key={index}>
          <h2>Resultado</h2>
          <span className="text-yellow-400">Panel(es) {result.count}</span>
          <p>Techo: 0</p>
          <p>Altura de Techo: 0</p>
          <p>Longitud de Techo: 0</p>
          <p>Altura Panel(es): 0</p>
          <p>Longitud Panel(es): 0</p>
        </div>
      ))}
      {formState && (
        <div className="text-white">
          <h2>Nuevo Resultado</h2>
          <span className="text-yellow-400">Panel(es) {formState.count}</span>
          <p>Techo: {formState.shape}</p>
          <p>Altura de Techo: {formState.height}</p>
          <p>Longitud de Techo: {formState.length}</p>
          <p>Altura Panel(es): {formState.quadrilateralHeight}</p>
          <p>Longitud Panel(es): {formState.quadrilateralLength}</p>
        </div>
      )}
    </div>
  );
};

export default SavedResults;
