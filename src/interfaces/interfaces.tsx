export interface FormState {
  shape: "cuadrado" | "triángulo";
  height: number;
  length: number;
  quadrilateralHeight: number;
  quadrilateralLength: number;
  count: number;
}

export interface SavedResultsProps {
  formState: FormState;
  count: number | null;
}

export interface FormResult {
  quadrilateralLength: number;
  quadrilateralHeight: number;
  length: number;
  height: number;
  shape: string;
  _id: string | null | undefined;
  count: number | null;
}

export interface FormStore {
  results: FormResult[];
  addResult: (newResult: FormResult) => void;
  deleteAll: () => void;
  fetchResults: () => void;
  addResultToDB: (newResult: FormResult) => void;
}
