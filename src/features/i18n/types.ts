export type Locale = 'en' | 'ar';

export interface TranslationDictionary {
  brand: {
    name: string;
    arabicSubtitle: string;
    englishSubtitle: string;
    address: string;
    timings: string;
    openNow: string;
    closedNow: string;
  };
  nav: {
    rituals: string;
    menu: string;
    loyalty: string;
    visit: string;
    sommelier: string;
    orderBag: string;
    langToggle: string;
  };
  hero: {
    overlineItalic: string;
    headlineMain: string;
    headlineArabic: string;
    description: string;
    ctaPickup: string;
    ctaMenu: string;
    ctaSommelier: string;
    badgeLocation: string;
    badgeHours: string;
    cardCaptionItalic: string;
    cardCaptionTitle: string;
  };
  showcase: {
    italicLead: string;
    title: string;
    subtitle: string;
    cards: {
      winterTag: string;
      winterTitle: string;
      winterDesc: string;
      winterQuote: string;
      ritualTag: string;
      ritualTitle: string;
      ritualDesc: string;
      ritualQuote: string;
      dessertTag: string;
      dessertTitle: string;
      dessertDesc: string;
      dessertQuote: string;
    };
  };
  menu: {
    italicLead: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    emptySearchTitle: string;
    categories: {
      all: string;
      winter_elixirs: string;
      specialty_brews: string;
      arabic_heritage: string;
      dessert_tubs: string;
      savoury: string;
    };
    addToOrder: string;
    added: string;
  };
  loyalty: {
    overline: string;
    title: string;
    tagline: string;
    rewardTitle: string;
    description: string;
    cartBonusLabel: string;
    openBoomingo: string;
    stampsCollected: string;
  };
  location: {
    italicLead: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressValue: string;
    hoursLabel: string;
    hoursValue: string;
    parkingTipTitle: string;
    parkingTipBody: string;
    hotelServiceTitle: string;
    hotelServiceBody: string;
    openMaps: string;
    followInstagram: string;
    bookHotelOrder: string;
  };
  sommelier: {
    badge: string;
    title: string;
    subtitle: string;
    moodLabel: string;
    preferenceLabel: string;
    pairingTitle: string;
    addPairing: string;
    close: string;
    moods: {
      winter_indulgence: { label: string; hint: string };
      crisp_clarity: { label: string; hint: string };
      arabic_ritual: { label: string; hint: string };
      midday_break: { label: string; hint: string };
    };
    intensities: {
      rich_sweet: string;
      balanced: string;
      bold_pure: string;
    };
  };
  order: {
    drawerTitle: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyCta: string;
    modePickup: string;
    modePickupHint: string;
    modeHotel: string;
    modeHotelHint: string;
    modeTubs: string;
    modeTubsHint: string;
    subtotal: string;
    serviceFee: string;
    freeLabel: string;
    total: string;
    stampsEarned: string;
    etaLabel: string;
    minutesUnit: string;
    scheduledLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    pickupWindowLabel: string;
    roomNumberLabel: string;
    roomNumberPlaceholder: string;
    tubDateLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    reviewOrder: string;
    confirmOrder: string;
    editDetails: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
    ticketCodeLabel: string;
    sendWhatsApp: string;
    newOrder: string;
  };
  footer: {
    quoteArabic: string;
    quoteEnglish: string;
    prototypeNote: string;
    rights: string;
  };
}
