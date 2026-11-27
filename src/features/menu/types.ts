export type MenuCategoryId =
  | 'winter_elixirs'
  | 'specialty_brews'
  | 'arabic_heritage'
  | 'dessert_tubs'
  | 'savoury';

export interface LocalizedCopy {
  en: string;
  ar: string;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: LocalizedCopy;
  italicOverline?: LocalizedCopy;
  tastingNotes: LocalizedCopy;
  pricePkr: number;
  image: string;
  temperature: 'hot' | 'iced';
  isSignature: boolean;
  hasNuts: boolean;
  earnsStamp: boolean;
  bellyBandLabel?: string;
  accentTone: 'crema' | 'terracotta' | 'pistachio' | 'ivory';
}
