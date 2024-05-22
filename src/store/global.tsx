import { create } from "zustand";
import { FormStore, FormResult } from "../interfaces/interfaces";

const resultsStore = create<FormStore>((set) => ({
  results: [],
  addResult: (newResult) =>
    set((state) => ({ results: [...state.results, newResult] })),
  deleteAll: async () => {
    try {
      const response = await fetch("/api/calculations", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete calculations");
      }
      set(() => ({ results: [] }));
    } catch (error) {
      console.error("Failed to delete calculations:", error);
    }
  },
  fetchResults: async () => {
    try {
      const response = await fetch("/api/calculations");
      const data: FormResult[] = await response.json();
      set({ results: data });
    } catch (error) {
      console.error("Failed to fetch calculations:", error);
    }
  },
  addResultToDB: async (newResult: FormResult) => {
    try {
      const response = await fetch("/api/calculations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResult),
      });
      if (!response.ok) {
        throw new Error("Failed to add calculation");
      }
      const savedResult = await response.json();
      set((state) => ({ results: [...state.results, savedResult] }));
    } catch (error) {
      console.error("Failed to add calculation:", error);
    }
  },
}));

export default resultsStore;
