export function parseRate(amount: number, reference: number): number {
  if (amount === 0) {
    return 0;
  }
  return (reference * 100) / amount;
}
