import { useMemo, useState, type FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/features/i18n/LanguageContext';
import { formatPkr } from '@/features/menu/logic/filterMenu';
import type { MenuItem } from '@/features/menu/types';
import {
  recommendPairing,
  type SommelierIntensity,
  type SommelierMood,
} from '../logic/conciergeEngine';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPairing: (items: readonly MenuItem[]) => void;
}

const MOODS: readonly SommelierMood[] = [
  'winter_indulgence',
  'crisp_clarity',
  'arabic_ritual',
  'midday_break',
];

const INTENSITIES: readonly SommelierIntensity[] = [
  'rich_sweet',
  'balanced',
  'bold_pure',
];

export const ConciergeModal: FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  onAddPairing,
}) => {
  const { locale, t } = useLanguage();
  const [mood, setMood] = useState<SommelierMood>('winter_indulgence');
  const [intensity, setIntensity] = useState<SommelierIntensity>('rich_sweet');

  const recommendation = useMemo(
    () => recommendPairing(mood, intensity),
    [mood, intensity],
  );

  const combinedPrice =
    recommendation.beverage.pricePkr + recommendation.pairing.pricePkr;

  const handleAddBoth = (): void => {
    onAddPairing([recommendation.beverage, recommendation.pairing]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.sommelier.badge}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#C89B65]/30 bg-[#120F0E] p-6 sm:p-8 text-[#F3EDE2] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C89B65]/35 bg-[#C89B65]/10 px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.sommelier.badge}
                </span>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#F3EDE2]">
                  {t.sommelier.title}
                </h2>
                <p className="mt-1 text-sm leading-[1.6] text-[#B5A898]">
                  {t.sommelier.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.sommelier.close}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F3EDE2]/15 text-[#B5A898] transition hover:border-[#C89B65] hover:text-[#F3EDE2]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Step 1: Mood */}
            <div className="mt-6">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                {t.sommelier.moodLabel}
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MOODS.map((m) => {
                  const active = mood === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`min-h-11 rounded-xl border p-3 text-start transition active:scale-[0.98] ${
                        active
                          ? 'border-[#C89B65] bg-[#C89B65]/15'
                          : 'border-[#F3EDE2]/10 bg-[#171311] hover:border-[#C89B65]/40'
                      }`}
                    >
                      <span className="block text-sm font-medium text-[#F3EDE2]">
                        {t.sommelier.moods[m].label}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#B5A898]">
                        {t.sommelier.moods[m].hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Intensity */}
            <div className="mt-6">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                {t.sommelier.preferenceLabel}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {INTENSITIES.map((lvl) => {
                  const active = intensity === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setIntensity(lvl)}
                      className={`min-h-11 rounded-full border px-3 py-2 text-xs font-medium transition active:scale-[0.98] ${
                        active
                          ? 'border-[#F3EDE2] bg-[#F3EDE2] text-[#0E0C0B]'
                          : 'border-[#F3EDE2]/15 bg-[#171311] text-[#B5A898] hover:text-[#F3EDE2]'
                      }`}
                    >
                      {t.sommelier.intensities[lvl]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pairing Output */}
            <div className="mt-6 rounded-2xl border border-[#C89B65]/35 bg-[#171311] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#C89B65]">
                  {t.sommelier.pairingTitle}
                </span>
                <span className="text-sm font-medium text-[#F3EDE2]">
                  {formatPkr(combinedPrice)}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-base font-medium text-[#F3EDE2]">
                  1. {recommendation.beverage.name[locale]}
                </p>
                <p className="text-base font-medium text-[#F3EDE2]">
                  2. {recommendation.pairing.name[locale]}
                </p>
              </div>

              <p className="mt-3 font-serif italic text-base leading-[1.5] text-[#C89B65]">
                “{recommendation.rationale[locale]}”
              </p>

              <button
                type="button"
                onClick={handleAddBoth}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#C89B65] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#d6ab77] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {t.sommelier.addPairing}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
