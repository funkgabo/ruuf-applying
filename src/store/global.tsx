import { create } from "zustand";
import { FormResult } from "../interfaces/interfaces";

interface FormStore {
  results: FormResult[];
  addResult: (newResult: FormResult) => void;
  deleteAll: () => void;
  fetchResults: () => void;
}

const resultsStore = create<FormStore>((set) => ({
  results: [],
  addResult: (newResult) =>
    set((state) => ({ results: [...state.results, newResult] })),
  deleteAll: () => set(() => ({ results: [] })),
  fetchResults: async () => {
    try {
      const response = await fetch("/api/calculations");
      const data: FormResult[] = await response.json();
      set({ results: data });
    } catch (error) {
      console.error("Failed to fetch calculations:", error);
    }
  },
}));

export default resultsStore;
