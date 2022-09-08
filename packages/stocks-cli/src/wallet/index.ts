import type { WalletStock } from "src/types/wallet";

const walletStocks: WalletStock[] = [
  { ticket: "BBAS3", custody: 18, target: 450, averagePrice: 38.95 },
  { ticket: "BBSE3", custody: 34, target: 425, averagePrice: 29.14 },
  { ticket: "BMGB4", custody: 99, target: 6720, averagePrice: 2.77 },
  { ticket: "BRAP3", custody: 20, target: 310, averagePrice: 20.83 },
  { ticket: "CEBR3", custody: 62, target: 220, averagePrice: 13.17 },
  { ticket: "CPFE3", custody: 15, target: 530, averagePrice: 33.85 },
  { ticket: "GOAU3", custody: 50, target: 1400, averagePrice: 9.58 },
  { ticket: "ITUB3", custody: 25, target: 700, averagePrice: 21.23 },
  { ticket: "KLBN3", custody: 198, target: 7225, averagePrice: 3.94 },
  { ticket: "PETR3", custody: 26, target: 250, averagePrice: 36.13 },
  { ticket: "SYNE3", custody: 50, target: 430, averagePrice: 1.97 },
  { ticket: "VALE3", custody: 17, target: 180, averagePrice: 65.73 },
];

export function loadWallet(): WalletStock[] {
  return walletStocks;
}
