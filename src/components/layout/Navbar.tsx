import type { FC } from 'react';
import { Globe, ShoppingBag, Sparkles } from 'lucide-react';
import { KafLogo } from '@/components/ui/KafLogo';
import { useLanguage } from '@/features/i18n/LanguageContext';

interface NavbarProps {
  cartCount: number;
  onOpenOrder: () => void;
  onOpenSommelier: () => void;
}

function isIslamabadCafeOpen(): boolean {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: 'numeric',
      hour12: false,
    });
    const hour = Number.parseInt(formatter.format(new Date()), 10);
    return hour >= 9 && hour <= 23;
  } catch {
    return true;
  }
}

export const Navbar: FC<NavbarProps> = ({
  cartCount,
  onOpenOrder,
  onOpenSommelier,
}) => {
  const { t, toggleLocale } = useLanguage();
  const open = isIslamabadCafeOpen();

  return (
    <header className="sticky top-0 z-40 border-b border-[#F3EDE2]/10 bg-[#0E0C0B]/95 md:bg-[#0E0C0B]/85 md:backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-3 text-[#F3EDE2] focus-visible:outline-2 focus-visible:outline-[#C89B65]"
        >
          <KafLogo size="sm" showWordmark={false} />
          <div className="leading-tight">
            <span className="block font-sans text-sm font-medium tracking-[0.22em] uppercase">
              {t.brand.name}
            </span>
            <span className="block text-[11px] text-[#C89B65]">
              {open ? t.brand.openNow : t.brand.closedNow}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-[#B5A898]">
          <a href="#rituals" className="min-h-11 inline-flex items-center hover:text-[#F3EDE2] transition">
            {t.nav.rituals}
          </a>
          <a href="#menu" className="min-h-11 inline-flex items-center hover:text-[#F3EDE2] transition">
            {t.nav.menu}
          </a>
          <a href="#loyalty" className="min-h-11 inline-flex items-center hover:text-[#F3EDE2] transition">
            {t.nav.loyalty}
          </a>
          <a href="#visit" className="min-h-11 inline-flex items-center hover:text-[#F3EDE2] transition">
            {t.nav.visit}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSommelier}
            className="hidden sm:inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#C89B65]/35 bg-[#171311] px-4 py-2 text-xs font-medium tracking-[0.06em] uppercase text-[#C89B65] transition hover:border-[#C89B65] hover:bg-[#221C18] active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.nav.sommelier}</span>
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Switch language between English and Arabic"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-[#F3EDE2]/15 bg-[#171311] px-3.5 py-2 text-xs font-medium text-[#F3EDE2] transition hover:border-[#C89B65]/50 active:scale-[0.98]"
          >
            <Globe className="h-3.5 w-3.5 text-[#C89B65]" aria-hidden="true" />
            <span>{t.nav.langToggle}</span>
          </button>

          <button
            type="button"
            onClick={onOpenOrder}
            className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F3EDE2] px-4 sm:px-5 py-2 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#C89B65] active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>{t.nav.orderBag}</span>
            {cartCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0E0C0B] px-1.5 text-[11px] font-semibold text-[#F3EDE2]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
