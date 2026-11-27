import { useMemo, useState, type FC } from 'react';
import { Search, X } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/features/i18n/LanguageContext';
import { MENU_ITEMS } from '../menuData';
import { filterMenuItems } from '../logic/filterMenu';
import type { MenuCategoryId, MenuItem } from '../types';
import { MenuCard } from './MenuCard';

interface MenuSectionProps {
  quantitiesById: Readonly<Record<string, number>>;
  onAddItem: (item: MenuItem) => void;
  onDecrementItem: (itemId: string) => void;
}

const CATEGORIES: readonly (MenuCategoryId | 'all')[] = [
  'all',
  'winter_elixirs',
  'specialty_brews',
  'arabic_heritage',
  'dessert_tubs',
  'savoury',
];

export const MenuSection: FC<MenuSectionProps> = ({
  quantitiesById,
  onAddItem,
  onDecrementItem,
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleItems = useMemo(
    () => filterMenuItems(MENU_ITEMS, selectedCategory, searchQuery),
    [selectedCategory, searchQuery],
  );

  return (
    <section id="menu" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          italicLead={t.menu.italicLead}
          title={t.menu.title}
          subtitle={t.menu.subtitle}
        />

        {/* Minimalist Search Bar */}
        <div className="relative mx-auto mt-6 max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 start-4 h-4 w-4 -translate-y-1/2 text-[#C89B65]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.menu.searchPlaceholder}
            aria-label={t.menu.searchPlaceholder}
            className="min-h-11 w-full rounded-full border border-[#F3EDE2]/15 bg-[#151210] ps-11 pe-11 text-sm text-[#F3EDE2] placeholder:text-[#B5A898]/60 transition focus:border-[#C89B65] focus:outline-none"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label={t.menu.clearSearch}
              className="absolute top-1/2 end-0.5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[#B5A898] transition hover:text-[#F3EDE2]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Single-Row Scrollable Category Strip */}
        <div
          className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 sm:justify-center"
          role="tablist"
          aria-label="Menu categories"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 min-h-11 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-medium tracking-[0.03em] transition active:scale-[0.98] ${
                  active
                    ? 'bg-[#F3EDE2] text-[#0E0C0B]'
                    : 'border border-[#F3EDE2]/12 bg-[#151210] text-[#B5A898] hover:border-[#C89B65]/40 hover:text-[#F3EDE2]'
                }`}
              >
                {t.menu.categories[category]}
              </button>
            );
          })}
        </div>

        {/* Menu Grid or Empty Search State */}
        {visibleItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#F3EDE2]/10 bg-[#151210] p-8 text-center">
            <p className="font-serif italic text-xl text-[#C89B65]">
              {t.menu.emptySearchTitle}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[#C89B65]/40 bg-[#221C18] px-5 py-2 text-xs font-medium tracking-[0.06em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65]"
            >
              {t.menu.clearSearch}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {visibleItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                quantity={quantitiesById[item.id] ?? 0}
                onAdd={onAddItem}
                onDecrement={onDecrementItem}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
