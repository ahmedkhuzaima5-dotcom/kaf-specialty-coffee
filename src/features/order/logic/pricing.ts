import type { CartLine, FulfillmentMode, OrderTotals } from '../types/orderTypes';

/**
 * Pure integer PKR calculations with zero floating-point drift.
 */
export function calculateCartTotals(
  lines: readonly CartLine[],
  fulfillment: FulfillmentMode,
): OrderTotals {
  let subtotalPkr = 0;
  let itemCount = 0;
  let boomingoStampsEarned = 0;

  for (const line of lines) {
    const qty = Math.max(0, Math.floor(line.quantity));
    subtotalPkr += line.item.pricePkr * qty;
    itemCount += qty;
    if (line.item.earnsStamp) {
      boomingoStampsEarned += qty;
    }
  }

  const serviceFeePkr = 0;
  const totalPkr = subtotalPkr + serviceFeePkr;

  const estimatedMinutes =
    fulfillment === 'express_pickup'
      ? 10
      : fulfillment === 'hotel_room'
        ? 14
        : null;

  return {
    subtotalPkr,
    serviceFeePkr,
    totalPkr,
    itemCount,
    boomingoStampsEarned,
    estimatedMinutes,
  };
}
