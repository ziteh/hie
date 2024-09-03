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
  id: number;
  label: string;
  align: Align;
}

export type Align = "right" | "left";

export type Order = "asc" | "desc";

export type TagRow = [number, string, string, string, string, string];
export type ItemRow = [number, string, string, string, string, string];
