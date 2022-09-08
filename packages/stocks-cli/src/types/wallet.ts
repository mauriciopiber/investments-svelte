import type { Stock } from ".";

export interface WalletStock {
  ticket: string;
  custody: number;
  target: number;
  averagePrice: number;
}

export interface WalletAsset extends Omit<WalletStock, "ticket"> {
  stock: Stock;
}

export type Wallet = WalletAsset[];
