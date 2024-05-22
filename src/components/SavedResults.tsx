import React, { useEffect } from "react";
import resultsStore from "@/store/global";

export const SavedResults = () => {
  const results = resultsStore((state) => state.results);
  const fetchResults = resultsStore((state) => state.fetchResults);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
      {results.map((result) => (
        <div className="text-white" key={result._id}>
          <h2>Resultado</h2>
          <span className="text-yellow-400">Panel(es) {result.count}</span>
          <p>Techo: {result?.shape}</p>
          <p>Altura de Techo: {result?.height}</p>
          <p>Longitud de Techo: {result?.length}</p>
          <p>Altura Panel(es): {result?.quadrilateralHeight}</p>
          <p>Longitud Panel(es): {result?.quadrilateralLength}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedResults;
