import { z } from 'zod';
import type { FulfillmentMode, OrderDraftInput } from '../types/orderTypes';

const BASE_NAME_SCHEMA = z
  .string()
  .trim()
  .min(2, 'Please enter your name (at least 2 characters).');

const PHONE_SCHEMA = z
  .string()
  .trim()
  .regex(/^[+\d\s-]{10,16}$/, 'Enter a valid WhatsApp / mobile number.');

const EXPRESS_PICKUP_SCHEMA = z.object({
  customerName: BASE_NAME_SCHEMA,
  phone: PHONE_SCHEMA,
  pickupWindow: z.string().trim().min(1, 'Select a pickup window.'),
  roomNumber: z.string(),
  preferredDateSlot: z.string(),
  notes: z.string().max(180),
});

const HOTEL_ROOM_SCHEMA = z.object({
  customerName: BASE_NAME_SCHEMA,
  phone: PHONE_SCHEMA,
  pickupWindow: z.string(),
  roomNumber: z
    .string()
    .trim()
    .regex(/^\d{3,4}[A-Za-z]?$/, 'Enter a valid Roomy Hotel room number (e.g. 204).'),
  preferredDateSlot: z.string(),
  notes: z.string().max(180),
});

const TUB_PREBOOK_SCHEMA = z.object({
  customerName: BASE_NAME_SCHEMA,
  phone: PHONE_SCHEMA,
  pickupWindow: z.string(),
  roomNumber: z.string(),
  preferredDateSlot: z.string().trim().min(1, 'Select a collection slot.'),
  notes: z.string().max(180),
});

export type ValidationResult =
  | { ok: true; data: OrderDraftInput }
  | { ok: false; errors: Partial<Record<keyof OrderDraftInput, string>> };

export function validateOrderDraft(
  fulfillment: FulfillmentMode,
  draft: OrderDraftInput,
): ValidationResult {
  const schema =
    fulfillment === 'express_pickup'
      ? EXPRESS_PICKUP_SCHEMA
      : fulfillment === 'hotel_room'
        ? HOTEL_ROOM_SCHEMA
        : TUB_PREBOOK_SCHEMA;

  const parsed = schema.safeParse(draft);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  const errors: Partial<Record<keyof OrderDraftInput, string>> = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof OrderDraftInput | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { ok: false, errors };
}
