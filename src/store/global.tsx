import { create } from "zustand";
import { FormResult } from "../interfaces/interfaces";

interface FormStore {
  results: FormResult[];
  addResult: (newResult: FormResult) => void;
  deleteAll: () => void;
}

const resultsStore = create<FormStore>((set) => ({
  results: [],
  addResult: (newResult) =>
    set((state) => ({ results: [...state.results, newResult] })),
  deleteAll: () => set(() => ({ results: [] })),
}));

export default resultsStore;
