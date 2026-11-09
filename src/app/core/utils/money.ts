/**
 * Rounds an amount to cents. Totals are sums and differences of prices in floating point
 * (389.90 − 38.99 = 350.90999999999997), and the API only accepts two decimals.
 */
export function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
