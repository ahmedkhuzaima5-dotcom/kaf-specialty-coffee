import { MENU_ITEMS } from '@/features/menu/menuData';
import type { LocalizedCopy, MenuItem } from '@/features/menu/types';

export type SommelierMood =
  | 'winter_indulgence'
  | 'crisp_clarity'
  | 'arabic_ritual'
  | 'midday_break';

export type SommelierIntensity = 'rich_sweet' | 'balanced' | 'bold_pure';

export interface SommelierRecommendation {
  beverage: MenuItem;
  pairing: MenuItem;
  rationale: LocalizedCopy;
}

const PAIRING_MATRIX: Record<
  SommelierMood,
  Record<SommelierIntensity, { bevId: string; pairId: string; rationale: LocalizedCopy }>
> = {
  winter_indulgence: {
    rich_sweet: {
      bevId: 'pistachio-hot-chocolate',
      pairId: 'trilece-tub',
      rationale: {
        en: 'Pure conched pistachio butter & single-origin couverture meet cloud-soft caramelized three-milk sponge.',
        ar: 'زبدة الفستق الطازجة مع شوكولاتة الكوفيرتور تناغم رائع مع كيك تريليتشي بالكراميل.',
      },
    },
    balanced: {
      bevId: 'swiss-hot-chocolate',
      pairId: 'tiramisu-tub',
      rationale: {
        en: 'Toasted cinnamon meringues lift silky Swiss couverture alongside espresso-laced mascarpone tiramisu.',
        ar: 'الشوكولاتة السويسرية مع مرينغ القرفة تبرز نكهة التيراميسو الغني بالإسبريسو.',
      },
    },
    bold_pure: {
      bevId: 'arabic-hot-chocolate',
      pairId: 'matilda-tub',
      rationale: {
        en: 'Robust Arabic spices cut through deep dark chocolate Matilda sponge for a lingering winter finish.',
        ar: 'التوابل العربية العميقة تتوازن مع كيك ماتيلدا الداكن لمذاق شتوي لا يُنسى.',
      },
    },
  },
  crisp_clarity: {
    rich_sweet: {
      bevId: 'spanish-iced-latte',
      pairId: 'biscoff-cheesecake',
      rationale: {
        en: 'Velvety Spanish iced espresso complements warm spiced caramel cheesecake.',
        ar: 'لاتيه إسباني مثلج وناعم يليق بتشيز كيك الكراميل واللوتس.',
      },
    },
    balanced: {
      bevId: 'iced-chemex',
      pairId: 'trilece-tub',
      rationale: {
        en: 'Floral Iced Chemex pour-over keeps the palate bright alongside creamy Trilece.',
        ar: 'صفاء الكيمكس المثلج يخلق توازناً لطيفاً مع حلاوة التريليتشي.',
      },
    },
    bold_pure: {
      bevId: 'bottled-cold-brew',
      pairId: 'matilda-tub',
      rationale: {
        en: '18-hour slow cold extraction amplifies cocoa notes in dark Matilda couverture.',
        ar: 'استخلاص كولد برو بطيء يعزز نكهات الكاكاو الداكن في كيك ماتيلدا.',
      },
    },
  },
  arabic_ritual: {
    rich_sweet: {
      bevId: 'arabic-hot-chocolate',
      pairId: 'biscoff-cheesecake',
      rationale: {
        en: 'Cardamom-warmed couverture meets caramelized biscuit crust — a modern majlis pairing.',
        ar: 'شوكولاتة بالتوابل العربية مع تشيز كيك الكراميل بتجربة ضيافة عصرية.',
      },
    },
    balanced: {
      bevId: 'turkish-coffee-milk',
      pairId: 'tiramisu-tub',
      rationale: {
        en: 'Slow-simmered Turkish roast softened with steamed milk alongside cocoa-dusted tiramisu.',
        ar: 'قهوة تركية مطهوة ببطء مع الحليب تناسب طبقات التيراميسو.',
      },
    },
    bold_pure: {
      bevId: 'arabic-qahwah',
      pairId: 'tiramisu-tub',
      rationale: {
        en: 'Authentic green-cardamom qahwah ritual — bright, aromatic, and timeless.',
        ar: 'طقوس القهوة العربية الأصيلة بالهيل والتمر — نقاء وعراقة.',
      },
    },
  },
  midday_break: {
    rich_sweet: {
      bevId: 'spanish-iced-latte',
      pairId: 'toasted-club-sandwich',
      rationale: {
        en: 'Your midday KAF combo: crisp toasted club sandwich balanced with a chilled Spanish latte.',
        ar: 'توليفة منتصف اليوم المثالية: كلوب ساندويتش محمص مع سبانيش لاتيه بارد.',
      },
    },
    balanced: {
      bevId: 'velvet-flat-white',
      pairId: 'toasted-club-sandwich',
      rationale: {
        en: 'Warm micro-foam flat white paired with KAF’s crisp toasted club & kettle crisps.',
        ar: 'فلات وايت مخملي دافئ مع كلوب ساندويتش كاف المقرمش.',
      },
    },
    bold_pure: {
      bevId: 'iced-chemex',
      pairId: 'toasted-club-sandwich',
      rationale: {
        en: 'Crisp single-origin Chemex refreshes cleanly alongside savoury toasted bites.',
        ar: 'كيمكس مثلج منعش يرافق وجبة الساندويتش المحمص.',
      },
    },
  },
};

function findItemOrFallback(id: string): MenuItem {
  return MENU_ITEMS.find((item) => item.id === id) ?? MENU_ITEMS[0];
}

export function recommendPairing(
  mood: SommelierMood,
  intensity: SommelierIntensity,
): SommelierRecommendation {
  const entry = PAIRING_MATRIX[mood][intensity];
  return {
    beverage: findItemOrFallback(entry.bevId),
    pairing: findItemOrFallback(entry.pairId),
    rationale: entry.rationale,
  };
}
