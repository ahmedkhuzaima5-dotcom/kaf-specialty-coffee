import type { MenuItem } from '@/features/menu/types';

export type FulfillmentMode = 'express_pickup' | 'hotel_room' | 'tub_prebook';

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface OrderTotals {
  subtotalPkr: number;
  serviceFeePkr: number;
  totalPkr: number;
  itemCount: number;
  boomingoStampsEarned: number;
  estimatedMinutes: number | null;
}

export interface OrderDraftInput {
  customerName: string;
  phone: string;
  pickupWindow: string;
  roomNumber: string;
  preferredDateSlot: string;
  notes: string;
}

export interface ValidatedOrder {
  fulfillment: FulfillmentMode;
  draft: OrderDraftInput;
  lines: readonly CartLine[];
  totals: OrderTotals;
}

export interface OrderReceipt {
  referenceCode: string;
  createdAtIso: string;
  order: ValidatedOrder;
}

/**
 * Deterministic Finite State Machine for KAF Express Pickup / Roomy Hotel Order Flow.
 * Makes impossible states unrepresentable.
 */
export type OrderFlowState =
  | { status: 'idle' }
  | {
      status: 'editing';
      fulfillment: FulfillmentMode;
      form: OrderDraftInput;
      fieldErrors: Partial<Record<keyof OrderDraftInput, string>>;
    }
  | {
      status: 'confirming';
      validatedOrder: ValidatedOrder;
    }
  | {
      status: 'confirmed';
      receipt: OrderReceipt;
    };
