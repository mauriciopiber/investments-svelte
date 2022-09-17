export interface Route {
  label: string;
  url?: string;
  pages?: Route[];
}

export type CurrencyType = 'currency';
export type RateType = 'rate';
export type LinkType = 'link';

export type HeaderItemType = CurrencyType | RateType | LinkType;

export interface HeaderItem {
  label: string;
  key: string;
  type?: HeaderItemType | undefined;
}

export type Header = HeaderItem[];

export interface RowLink {
  // type: LinkType;
  href: string;
  value: string;
}

// interface RowCurrency {
//   type: CurrencyType;
//   value: number;
// }

// interface RowRate {
//   type: RateType;
//   value: number;
// }

export type RowCell = string | number | RowLink;

export interface Row {
  [key: string]: RowCell;
}

export type Rows = Row[];
