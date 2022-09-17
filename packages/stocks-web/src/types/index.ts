export interface Route {
  label: string;
  url?: string;
  pages?: Route[];
}

export type CurrencyType = 'currency';
export type RateType = 'rate';
export type LinkType = 'link';

export interface Header {
  value: string;
  key: string;
}

interface RowLink {
  type: LinkType;
  href: string;
  value: string;
}

interface RowCurrency {
  type: CurrencyType;
  value: number;
}

interface RowRate {
  type: RateType;
  value: number;
}

interface RowGeneric {
  value: string | number;
  type?: 'generic';
}

export type RowCell = RowGeneric | RowLink | RowCurrency | RowRate;

export interface Row {
  [key: string]: RowCell;
}
