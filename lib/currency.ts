// All internal values are stored in USD.
// Display currency: Vietnamese Dong (₫).
// At 25,000 VND per USD, earning even $0.25 = 6,250₫ — satisfying.

export const USD_TO_VND = 25_000;

/** Convert a USD float to a whole VND integer. */
export function toVND(usd: number): number {
  return Math.round(usd * USD_TO_VND);
}

/** Format a USD float as a plain VND number string with comma thousands separators.
 *  e.g. 0.25 → "6,250"  (no symbol — used inside AnimatedBalance so ₫ can be styled separately)
 */
export function formatVNDNumber(usd: number): string {
  const vnd = toVND(usd);
  return Math.abs(vnd)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Format a USD float as a full VND string with symbol.
 *  e.g. 0.25 → "6,250₫"  (used in shop prices, reward popups, etc.)
 */
export function formatVND(usd: number): string {
  return formatVNDNumber(usd) + "₫";
}

/** Format a signed USD delta as a VND delta string.
 *  e.g. +0.25 → "+6,250₫"  |  -1.50 → "-37,500₫"
 */
export function formatVNDDelta(usd: number): string {
  const sign = usd >= 0 ? "+" : "-";
  return sign + formatVND(Math.abs(usd));
}
