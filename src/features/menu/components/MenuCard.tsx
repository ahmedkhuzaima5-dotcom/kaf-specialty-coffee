import type { FC } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/features/i18n/LanguageContext';
import type { MenuItem } from '../types';
import { formatPkr } from '../logic/filterMenu';

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onDecrement: (itemId: string) => void;
}

/**
 * Minimalist dual-mode card:
 * - Mobile (< sm): sleek horizontal row with 80x80 photo + concise copy + 44x44 '+' button.
 * - Tablet/Desktop (sm:+): editorial vertical photo card with clean spacing.
 */
export const MenuCard: FC<MenuCardProps> = ({
  item,
  quantity,
  onAdd,
  onDecrement,
}) => {
  const { locale, t } = useLanguage();

  return (
    <article className="@container group flex items-center gap-3.5 sm:flex-col sm:items-stretch sm:justify-between sm:gap-4 rounded-2xl border border-[#F3EDE2]/10 bg-[#151210] p-3 sm:p-4 transition-colors duration-150 hover:border-[#C89B65]/40">
      {/* Thumbnail + optional dessert belly-band tag */}
      <div className="relative h-20 w-20 shrink-0 sm:h-auto sm:w-full sm:aspect-[4/3] overflow-hidden rounded-xl bg-[#221C18]">
        <img
          src={item.image}
          alt={item.name[locale]}
          width={440}
          height={440}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        {item.bellyBandLabel && (
          <span className="absolute bottom-1.5 start-1.5 rounded bg-[#F2ECE1] px-2 py-0.5 font-serif text-[9px] font-semibold tracking-[0.12em] uppercase text-[#111111] shadow-sm">
            {item.bellyBandLabel}
          </span>
        )}
      </div>

      {/* Text + Price/Action */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:flex-col sm:items-stretch">
        <div className="min-w-0">
          <h3 className="font-sans text-sm sm:text-base font-medium leading-snug text-[#F3EDE2]">
            {item.name[locale]}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#B5A898] line-clamp-2">
            {item.tastingNotes[locale]}
          </p>
          <p className="mt-1.5 text-xs font-medium text-[#C89B65] sm:hidden">
            {formatPkr(item.pricePkr)}
          </p>
        </div>

        {/* Desktop bottom bar / Mobile end action */}
        <div className="flex shrink-0 items-center sm:justify-between sm:border-t sm:border-[#F3EDE2]/8 sm:pt-3">
          <span className="hidden sm:inline font-sans text-sm font-medium text-[#C89B65]">
            {formatPkr(item.pricePkr)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              aria-label={`${t.menu.addToOrder} ${item.name[locale]}`}
              className="flex h-11 w-11 sm:w-auto sm:px-4 items-center justify-center gap-1.5 rounded-full border border-[#C89B65]/40 bg-[#221C18] text-xs font-medium tracking-[0.06em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] hover:bg-[#C89B65] hover:text-[#0E0C0B] active:scale-[0.96]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t.menu.addToOrder}</span>
            </button>
          ) : (
            <div className="inline-flex items-center rounded-full border border-[#C89B65]/60 bg-[#221C18]">
              <button
                type="button"
                onClick={() => onDecrement(item.id)}
                aria-label={`Remove one ${item.name[locale]}`}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#F3EDE2] transition hover:bg-[#F3EDE2]/10 active:scale-[0.95]"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span
                className="min-w-5 text-center text-xs font-semibold text-[#C89B65]"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item)}
                aria-label={`Add one more ${item.name[locale]}`}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#F3EDE2] transition hover:bg-[#F3EDE2]/10 active:scale-[0.95]"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
