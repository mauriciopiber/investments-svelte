import type { TicketFilterTypes } from "./search";

export interface IndicatorGroup {
  name: string;
  indicators: Indicator[];
}

export interface Indicator {
  label: string;
  key: TicketFilterTypes;
}
