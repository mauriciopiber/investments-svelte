import type { Color, WrapStrategy, NumberFormat } from "google-spreadsheet";

export interface SheetHeaders<T> {
  title: string;
  key: T;
  numberFormat: NumberFormat | null;
  backgroundColor: Color | ((row: SheetRow) => Color) | null;
  wrapStrategy: WrapStrategy | null;
}

export interface SheetRow {
  [key: string]: number | string | boolean;
}
