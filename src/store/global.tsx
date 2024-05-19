import { create } from "zustand";
import { FormResult } from "../interfaces/interfaces";

interface FormStore {
  results: FormResult[];
  addResult: (newResult: FormResult) => void;
}

const resultsStore = create<FormStore>((set) => ({
  results: [],
  addResult: (newResult) =>
    set((state) => ({ results: [...state.results, newResult] })),
}));

export default resultsStore;
