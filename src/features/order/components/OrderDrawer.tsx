import type { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BedDouble,
  CalendarClock,
  CheckCircle2,
  Coffee,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
import { useLanguage } from '@/features/i18n/LanguageContext';
import { formatPkr } from '@/features/menu/logic/filterMenu';
import type { MenuItem } from '@/features/menu/types';
import { buildWhatsAppOrderUrl, type OrderFlowEvent } from '../logic/orderMachine';
import { calculateCartTotals } from '../logic/pricing';
import type {
  CartLine,
  FulfillmentMode,
  OrderFlowState,
} from '../types/orderTypes';

interface OrderDrawerProps {
  isOpen: boolean;
  lines: readonly CartLine[];
  flowState: OrderFlowState;
  onClose: () => void;
  onDispatchFlow: (event: OrderFlowEvent) => void;
  onIncrementItem: (item: MenuItem) => void;
  onDecrementItem: (itemId: string) => void;
  onClearCart: () => void;
}

const PICKUP_WINDOWS = [
  'In 10–15 mins',
  'In 25–30 mins',
  'Tonight · 9:00 PM',
  'Tonight · 11:00 PM',
] as const;

const COLLECTION_SLOTS = [
  'Today · Evening (6:00 PM – 9:00 PM)',
  'Today · Late Night (9:00 PM – 12:00 AM)',
  'Tomorrow · Afternoon (1:00 PM – 4:00 PM)',
] as const;

export const OrderDrawer: FC<OrderDrawerProps> = ({
  isOpen,
  lines,
  flowState,
  onClose,
  onDispatchFlow,
  onIncrementItem,
  onDecrementItem,
  onClearCart,
}) => {
  const { locale, isRtl, t } = useLanguage();

  const activeFulfillment: FulfillmentMode =
    flowState.status === 'editing'
      ? flowState.fulfillment
      : flowState.status === 'confirming'
        ? flowState.validatedOrder.fulfillment
        : flowState.status === 'confirmed'
          ? flowState.receipt.order.fulfillment
          : 'express_pickup';

  const totals = calculateCartTotals(lines, activeFulfillment);

  const fulfillmentOptions: readonly {
    id: FulfillmentMode;
    label: string;
    hint: string;
    icon: typeof Store;
  }[] = [
    {
      id: 'express_pickup',
      label: t.order.modePickup,
      hint: t.order.modePickupHint,
      icon: Store,
    },
    {
      id: 'hotel_room',
      label: t.order.modeHotel,
      hint: t.order.modeHotelHint,
      icon: BedDouble,
    },
    {
      id: 'tub_prebook',
      label: t.order.modeTubs,
      hint: t.order.modeTubsHint,
      icon: CalendarClock,
    },
  ];

  const handleStartAnother = (): void => {
    onClearCart();
    onDispatchFlow({ type: 'RESET_ORDER' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={t.order.drawerTitle}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-s border-[#C89B65]/20 bg-[#120F0E] text-[#F3EDE2] shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#F3EDE2]/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#C89B65]" aria-hidden="true" />
                <h2 className="font-sans text-lg font-medium tracking-[-0.01em]">
                  {t.order.drawerTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close order drawer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F3EDE2]/15 text-[#B5A898] transition hover:border-[#C89B65] hover:text-[#F3EDE2] active:scale-[0.96]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {flowState.status === 'confirmed' ? (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#C89B65]/35 bg-[#171311] p-6 text-center">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-[#C89B65]" aria-hidden="true" />
                    <h3 className="mt-4 font-sans text-2xl font-normal text-[#F3EDE2]">
                      {t.order.confirmedTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.6] text-[#B5A898]">
                      {t.order.confirmedSubtitle}
                    </p>

                    <div className="mt-6 rounded-xl bg-[#F2ECE1] px-4 py-3 text-[#111111]">
                      <span className="block text-[11px] font-medium tracking-[0.12em] uppercase text-[#111111]/70">
                        {t.order.ticketCodeLabel}
                      </span>
                      <span className="mt-0.5 block font-serif text-2xl font-semibold tracking-[0.06em]">
                        {flowState.receipt.referenceCode}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#F3EDE2]/10 bg-[#171311] p-6 space-y-3 text-sm">
                    <div className="flex justify-between text-[#B5A898]">
                      <span>{t.order.nameLabel}</span>
                      <span className="text-[#F3EDE2]">{flowState.receipt.order.draft.customerName}</span>
                    </div>
                    <div className="flex justify-between text-[#B5A898]">
                      <span>{t.order.total}</span>
                      <span className="font-medium text-[#F3EDE2]">
                        {formatPkr(flowState.receipt.order.totals.totalPkr)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#B5A898]">
                      <span>{t.order.stampsEarned}</span>
                      <span className="text-[#C89B65]">
                        +{flowState.receipt.order.totals.boomingoStampsEarned}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href={buildWhatsAppOrderUrl(flowState.receipt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C89B65] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#d6ab77] active:scale-[0.98]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {t.order.sendWhatsApp}
                    </a>
                    <button
                      type="button"
                      onClick={handleStartAnother}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#F3EDE2]/20 px-6 py-3 text-xs font-medium tracking-[0.08em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] active:scale-[0.98]"
                    >
                      {t.order.newOrder}
                    </button>
                  </div>
                </div>
              ) : lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C89B65]/25 bg-[#171311]">
                    <Coffee className="h-7 w-7 text-[#C89B65]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-serif italic text-2xl text-[#F3EDE2]">
                    {t.order.emptyTitle}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm leading-[1.6] text-[#B5A898]">
                    {t.order.emptyDesc}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-[#C89B65]/40 bg-[#221C18] px-6 py-2.5 text-xs font-medium tracking-[0.08em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] active:scale-[0.98]"
                  >
                    {t.order.emptyCta}
                  </button>
                </div>
              ) : flowState.status === 'confirming' ? (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#C89B65]/30 bg-[#171311] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                        {flowState.validatedOrder.fulfillment === 'express_pickup'
                          ? t.order.modePickup
                          : flowState.validatedOrder.fulfillment === 'hotel_room'
                            ? `${t.order.modeHotel} #${flowState.validatedOrder.draft.roomNumber}`
                            : t.order.modeTubs}
                      </span>
                      <span className="text-xs text-[#B5A898]">
                        {flowState.validatedOrder.totals.estimatedMinutes
                          ? `~${flowState.validatedOrder.totals.estimatedMinutes} ${t.order.minutesUnit}`
                          : flowState.validatedOrder.draft.preferredDateSlot}
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-[#F3EDE2]/10 pt-4 text-sm">
                      {flowState.validatedOrder.lines.map((line) => (
                        <div key={line.item.id} className="flex justify-between gap-2">
                          <span className="text-[#F3EDE2]">
                            {line.quantity}× {line.item.name[locale]}
                          </span>
                          <span className="shrink-0 text-[#B5A898]">
                            {formatPkr(line.item.pricePkr * line.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 border-t border-[#F3EDE2]/10 pt-4 text-sm">
                      <div className="flex justify-between text-[#B5A898]">
                        <span>{t.order.nameLabel}</span>
                        <span className="text-[#F3EDE2]">{flowState.validatedOrder.draft.customerName}</span>
                      </div>
                      <div className="flex justify-between text-[#B5A898]">
                        <span>{t.order.phoneLabel}</span>
                        <span className="text-[#F3EDE2]">{flowState.validatedOrder.draft.phone}</span>
                      </div>
                      {flowState.validatedOrder.draft.notes && (
                        <div className="flex justify-between gap-4 text-[#B5A898]">
                          <span>{t.order.notesLabel}</span>
                          <span className="text-end text-[#F3EDE2]">
                            {flowState.validatedOrder.draft.notes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => onDispatchFlow({ type: 'CONFIRM_ORDER' })}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#C89B65] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#d6ab77] active:scale-[0.98]"
                    >
                      {t.order.confirmOrder}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDispatchFlow({ type: 'EDIT_AGAIN' })}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#F3EDE2]/20 px-6 py-3 text-xs font-medium tracking-[0.08em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] active:scale-[0.98]"
                    >
                      {t.order.editDetails}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Fulfillment Mode Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {fulfillmentOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = activeFulfillment === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            onDispatchFlow({
                              type: 'SET_FULFILLMENT',
                              fulfillment: opt.id,
                            })
                          }
                          className={`flex min-h-11 flex-col items-center justify-center rounded-xl border p-2 text-center transition active:scale-[0.98] ${
                            active
                              ? 'border-[#C89B65] bg-[#C89B65]/15 text-[#F3EDE2]'
                              : 'border-[#F3EDE2]/10 bg-[#171311] text-[#B5A898] hover:border-[#C89B65]/40'
                          }`}
                        >
                          <Icon className="h-4 w-4 text-[#C89B65]" aria-hidden="true" />
                          <span className="mt-1 text-[11px] font-medium leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-3">
                    {lines.map((line) => (
                      <div
                        key={line.item.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#F3EDE2]/10 bg-[#171311] p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#F3EDE2]">
                            {line.item.name[locale]}
                          </p>
                          <p className="mt-0.5 text-xs text-[#B5A898]">
                            {formatPkr(line.item.pricePkr * line.quantity)}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#F3EDE2]/15 bg-[#221C18] p-0.5">
                          <button
                            type="button"
                            onClick={() => onDecrementItem(line.item.id)}
                            aria-label={`Remove ${line.item.name[locale]}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-[#F3EDE2] hover:bg-[#F3EDE2]/10 active:scale-[0.95]"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-5 text-center text-xs font-medium text-[#C89B65]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrementItem(line.item)}
                            aria-label={`Add ${line.item.name[locale]}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-[#F3EDE2] hover:bg-[#F3EDE2]/10 active:scale-[0.95]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Guest Form Fields (when editing) */}
                  {flowState.status === 'editing' && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onDispatchFlow({ type: 'REVIEW_ORDER', lines });
                      }}
                      className="space-y-4 border-t border-[#F3EDE2]/10 pt-5"
                      noValidate
                    >
                      <div>
                        <label
                          htmlFor="kaf-guest-name"
                          className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                        >
                          {t.order.nameLabel}
                        </label>
                        <input
                          id="kaf-guest-name"
                          type="text"
                          value={flowState.form.customerName}
                          onChange={(e) =>
                            onDispatchFlow({
                              type: 'UPDATE_FIELD',
                              field: 'customerName',
                              value: e.target.value,
                            })
                          }
                          placeholder={t.order.namePlaceholder}
                          className="mt-1.5 min-h-11 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2 text-sm text-[#F3EDE2] placeholder:text-[#B5A898]/50 focus:border-[#C89B65] focus:outline-none"
                        />
                        {flowState.fieldErrors.customerName && (
                          <p className="mt-1 text-xs text-[#E5987E]">
                            {flowState.fieldErrors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="kaf-guest-phone"
                          className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                        >
                          {t.order.phoneLabel}
                        </label>
                        <input
                          id="kaf-guest-phone"
                          type="tel"
                          value={flowState.form.phone}
                          onChange={(e) =>
                            onDispatchFlow({
                              type: 'UPDATE_FIELD',
                              field: 'phone',
                              value: e.target.value,
                            })
                          }
                          placeholder={t.order.phonePlaceholder}
                          className="mt-1.5 min-h-11 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2 text-sm text-[#F3EDE2] placeholder:text-[#B5A898]/50 focus:border-[#C89B65] focus:outline-none"
                        />
                        {flowState.fieldErrors.phone && (
                          <p className="mt-1 text-xs text-[#E5987E]">
                            {flowState.fieldErrors.phone}
                          </p>
                        )}
                      </div>

                      {flowState.fulfillment === 'express_pickup' && (
                        <div>
                          <label
                            htmlFor="kaf-pickup-window"
                            className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                          >
                            {t.order.pickupWindowLabel}
                          </label>
                          <select
                            id="kaf-pickup-window"
                            value={flowState.form.pickupWindow}
                            onChange={(e) =>
                              onDispatchFlow({
                                type: 'UPDATE_FIELD',
                                field: 'pickupWindow',
                                value: e.target.value,
                              })
                            }
                            className="mt-1.5 min-h-11 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2 text-sm text-[#F3EDE2] focus:border-[#C89B65] focus:outline-none"
                          >
                            {PICKUP_WINDOWS.map((win) => (
                              <option key={win} value={win}>
                                {win}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {flowState.fulfillment === 'hotel_room' && (
                        <div>
                          <label
                            htmlFor="kaf-room-number"
                            className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                          >
                            {t.order.roomNumberLabel}
                          </label>
                          <input
                            id="kaf-room-number"
                            type="text"
                            value={flowState.form.roomNumber}
                            onChange={(e) =>
                              onDispatchFlow({
                                type: 'UPDATE_FIELD',
                                field: 'roomNumber',
                                value: e.target.value,
                              })
                            }
                            placeholder={t.order.roomNumberPlaceholder}
                            className="mt-1.5 min-h-11 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2 text-sm text-[#F3EDE2] placeholder:text-[#B5A898]/50 focus:border-[#C89B65] focus:outline-none"
                          />
                          {flowState.fieldErrors.roomNumber && (
                            <p className="mt-1 text-xs text-[#E5987E]">
                              {flowState.fieldErrors.roomNumber}
                            </p>
                          )}
                        </div>
                      )}

                      {flowState.fulfillment === 'tub_prebook' && (
                        <div>
                          <label
                            htmlFor="kaf-tub-slot"
                            className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                          >
                            {t.order.tubDateLabel}
                          </label>
                          <select
                            id="kaf-tub-slot"
                            value={flowState.form.preferredDateSlot}
                            onChange={(e) =>
                              onDispatchFlow({
                                type: 'UPDATE_FIELD',
                                field: 'preferredDateSlot',
                                value: e.target.value,
                              })
                            }
                            className="mt-1.5 min-h-11 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2 text-sm text-[#F3EDE2] focus:border-[#C89B65] focus:outline-none"
                          >
                            {COLLECTION_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="kaf-barista-notes"
                          className="block text-xs font-medium tracking-[0.06em] uppercase text-[#B5A898]"
                        >
                          {t.order.notesLabel}
                        </label>
                        <textarea
                          id="kaf-barista-notes"
                          rows={2}
                          value={flowState.form.notes}
                          onChange={(e) =>
                            onDispatchFlow({
                              type: 'UPDATE_FIELD',
                              field: 'notes',
                              value: e.target.value,
                            })
                          }
                          placeholder={t.order.notesPlaceholder}
                          className="mt-1.5 w-full rounded-xl border border-[#F3EDE2]/15 bg-[#171311] px-4 py-2.5 text-sm text-[#F3EDE2] placeholder:text-[#B5A898]/50 focus:border-[#C89B65] focus:outline-none"
                        />
                      </div>

                      {/* Summary Card */}
                      <div className="rounded-xl border border-[#C89B65]/20 bg-[#171311] p-4 space-y-2 text-sm">
                        <div className="flex justify-between text-[#B5A898]">
                          <span>{t.order.subtotal}</span>
                          <span className="text-[#F3EDE2]">{formatPkr(totals.subtotalPkr)}</span>
                        </div>
                        <div className="flex justify-between text-[#B5A898]">
                          <span>{t.order.serviceFee}</span>
                          <span className="text-[#B5C28E]">{t.order.freeLabel}</span>
                        </div>
                        <div className="flex justify-between text-[#B5A898]">
                          <span className="inline-flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-[#C89B65]" aria-hidden="true" />
                            {t.order.stampsEarned}
                          </span>
                          <span className="text-[#C89B65]">+{totals.boomingoStampsEarned}</span>
                        </div>
                        <div className="flex justify-between border-t border-[#F3EDE2]/10 pt-2 text-base font-medium text-[#F3EDE2]">
                          <span>{t.order.total}</span>
                          <span>{formatPkr(totals.totalPkr)}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#F3EDE2] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#C89B65] active:scale-[0.98]"
                      >
                        {t.order.reviewOrder}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
