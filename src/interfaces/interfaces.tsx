export interface FormState {
  shape: "cuadrado" | "triángulo";
  height: number;
  length: number;
  quadrilateralHeight: number;
  quadrilateralLength: number;
}

export interface SavedResultsProps {
  formState: FormState;
  count: number | null;
}

export interface FormResult {
  formState: FormState;
  count: number | null;
}

export interface FormStore {
  results: FormResult[];
  addResult: (newResult: FormResult) => void;
}
