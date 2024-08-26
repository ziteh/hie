export interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

export interface HeadCell {
  id: keyof Data;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export type Order = "asc" | "desc";
