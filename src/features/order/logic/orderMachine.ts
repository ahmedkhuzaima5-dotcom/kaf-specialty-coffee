import { formatPkr } from '@/features/menu/logic/filterMenu';
import type {
  CartLine,
  FulfillmentMode,
  OrderDraftInput,
  OrderFlowState,
  OrderReceipt,
} from '../types/orderTypes';
import { calculateCartTotals } from './pricing';
import { validateOrderDraft } from './orderValidation';

export const INITIAL_ORDER_DRAFT: OrderDraftInput = {
  customerName: '',
  phone: '',
  pickupWindow: 'In 10–15 mins',
  roomNumber: '',
  preferredDateSlot: 'Today · Evening (6:00 PM – 9:00 PM)',
  notes: '',
};

export type OrderFlowEvent =
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_TO_IDLE' }
  | { type: 'SET_FULFILLMENT'; fulfillment: FulfillmentMode }
  | { type: 'UPDATE_FIELD'; field: keyof OrderDraftInput; value: string }
  | { type: 'REVIEW_ORDER'; lines: readonly CartLine[] }
  | { type: 'EDIT_AGAIN' }
  | { type: 'CONFIRM_ORDER' }
  | { type: 'RESET_ORDER' };

function generateReferenceCode(fulfillment: FulfillmentMode): string {
  const prefix =
    fulfillment === 'express_pickup'
      ? 'KAF-PK'
      : fulfillment === 'hotel_room'
        ? 'KAF-RM'
        : 'KAF-TB';
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${suffix}`;
}

export function transitionOrderFlow(
  state: OrderFlowState,
  event: OrderFlowEvent,
): OrderFlowState {
  switch (event.type) {
    case 'OPEN_DRAWER': {
      if (state.status !== 'idle') {
        return state;
      }
      return {
        status: 'editing',
        fulfillment: 'express_pickup',
        form: { ...INITIAL_ORDER_DRAFT },
        fieldErrors: {},
      };
    }

    case 'CLOSE_TO_IDLE':
      return { status: 'idle' };

    case 'SET_FULFILLMENT': {
      if (state.status === 'editing') {
        return {
          ...state,
          fulfillment: event.fulfillment,
          fieldErrors: {},
        };
      }
      return {
        status: 'editing',
        fulfillment: event.fulfillment,
        form: { ...INITIAL_ORDER_DRAFT },
        fieldErrors: {},
      };
    }

    case 'UPDATE_FIELD': {
      if (state.status !== 'editing') {
        return state;
      }
      const nextErrors = { ...state.fieldErrors };
      delete nextErrors[event.field];
      return {
        ...state,
        form: {
          ...state.form,
          [event.field]: event.value,
        },
        fieldErrors: nextErrors,
      };
    }

    case 'REVIEW_ORDER': {
      if (state.status !== 'editing' || event.lines.length === 0) {
        return state;
      }
      const validation = validateOrderDraft(state.fulfillment, state.form);
      if (!validation.ok) {
        return {
          ...state,
          fieldErrors: validation.errors,
        };
      }
      const totals = calculateCartTotals(event.lines, state.fulfillment);
      return {
        status: 'confirming',
        validatedOrder: {
          fulfillment: state.fulfillment,
          draft: validation.data,
          lines: event.lines,
          totals,
        },
      };
    }

    case 'EDIT_AGAIN': {
      if (state.status !== 'confirming') {
        return state;
      }
      return {
        status: 'editing',
        fulfillment: state.validatedOrder.fulfillment,
        form: state.validatedOrder.draft,
        fieldErrors: {},
      };
    }

    case 'CONFIRM_ORDER': {
      if (state.status !== 'confirming') {
        return state;
      }
      return {
        status: 'confirmed',
        receipt: {
          referenceCode: generateReferenceCode(state.validatedOrder.fulfillment),
          createdAtIso: new Date().toISOString(),
          order: state.validatedOrder,
        },
      };
    }

    case 'RESET_ORDER':
      return {
        status: 'editing',
        fulfillment: 'express_pickup',
        form: { ...INITIAL_ORDER_DRAFT },
        fieldErrors: {},
      };
  }
}

export function buildWhatsAppOrderUrl(receipt: OrderReceipt): string {
  const { order, referenceCode } = receipt;
  const modeLabel =
    order.fulfillment === 'express_pickup'
      ? `Express Counter Pickup (${order.draft.pickupWindow})`
      : order.fulfillment === 'hotel_room'
        ? `Roomy Hotel Room #${order.draft.roomNumber}`
        : `Tub Pre-Book (${order.draft.preferredDateSlot})`;

  const linesText = order.lines
    .map(
      (line) =>
        `• ${line.quantity}x ${line.item.name.en} (${formatPkr(line.item.pricePkr * line.quantity)})`,
    )
    .join('\n');

  const notesLine = order.draft.notes.trim()
    ? `\nNotes: ${order.draft.notes.trim()}`
    : '';

  const message = [
    `KAF Speciality Coffee — Order ${referenceCode}`,
    `Mode: ${modeLabel}`,
    `Guest: ${order.draft.customerName} (${order.draft.phone})`,
    '',
    linesText,
    '',
    `Total: ${formatPkr(order.totals.totalPkr)}`,
    `Boomingo Stamps: +${order.totals.boomingoStampsEarned}`,
    notesLine,
  ]
    .filter((segment) => segment !== undefined)
    .join('\n');

  return `https://wa.me/923100577770?text=${encodeURIComponent(message)}`;
}
