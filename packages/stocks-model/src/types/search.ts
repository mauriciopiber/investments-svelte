import type { Indicators } from "./ticket";

export type TicketFilterTypes = keyof Indicators;

export interface Filter {
  key: TicketFilterTypes;
  range: {
    min: number;
    max: number;
  };
}

export interface InputFilter {
  input: Filter[];
}
