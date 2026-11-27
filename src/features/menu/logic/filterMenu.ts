import type { MenuCategoryId, MenuItem } from '../types';

export function filterMenuItems(
  items: readonly MenuItem[],
  category: MenuCategoryId | 'all',
  searchQuery: string,
): readonly MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      item.name.en,
      item.name.ar,
      item.tastingNotes.en,
      item.tastingNotes.ar,
      item.bellyBandLabel ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function formatPkr(amountPkr: number): string {
  return `PKR ${amountPkr.toLocaleString('en-PK')}`;
}
