export function parseRate(amount: number, reference: number): number {
  return (reference * 100) / amount / 100;
}
