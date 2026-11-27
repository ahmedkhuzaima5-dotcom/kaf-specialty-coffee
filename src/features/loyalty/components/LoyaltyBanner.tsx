import type { FC } from 'react';
import { ExternalLink, Gift } from 'lucide-react';
import { KafLogo } from '@/components/ui/KafLogo';
import { useLanguage } from '@/features/i18n/LanguageContext';

interface LoyaltyBannerProps {
  stampsInCart: number;
}

const TOTAL_STAMPS = 10;
const BASE_DEMO_STAMPS = 4;

export const LoyaltyBanner: FC<LoyaltyBannerProps> = ({ stampsInCart }) => {
  const { t } = useLanguage();
  const filledCount = Math.min(TOTAL_STAMPS, BASE_DEMO_STAMPS + stampsInCart);

  return (
    <section id="loyalty" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#C89B65]/25 bg-[#171311]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-10 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-[#C89B65]">
              <Gift className="h-4 w-4" aria-hidden="true" />
              {t.loyalty.overline}
            </span>

            <h2 className="font-sans text-3xl sm:text-4xl font-light tracking-[-0.02em] text-[#F3EDE2]">
              {t.loyalty.title}
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-[#C89B65]">
              {t.loyalty.tagline}
            </p>

            <p className="max-w-[58ch] text-sm sm:text-base leading-[1.6] text-[#B5A898]">
              {t.loyalty.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://app.boomingo.io/program/25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F3EDE2] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#C89B65] active:scale-[0.98]"
              >
                <span>{t.loyalty.openBoomingo}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              {stampsInCart > 0 && (
                <span className="rounded-full border border-[#C89B65]/35 bg-[#C89B65]/10 px-4 py-2 text-xs font-medium text-[#C89B65]">
                  {t.loyalty.cartBonusLabel}: +{stampsInCart}
                </span>
              )}
            </div>
          </div>

          {/* Physical-Inspired Cream Loyalty Card Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#F2ECE1] p-6 sm:p-8 text-[#111111] shadow-xl">
              <div className="flex items-center justify-between border-b border-[#111111]/12 pb-4">
                <div>
                  <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#111111]/65">
                    {t.loyalty.rewardTitle}
                  </span>
                  <span className="mt-1 block font-serif text-xl font-semibold">
                    {t.loyalty.tagline}
                  </span>
                </div>
                <KafLogo size="sm" showWordmark={false} className="text-[#111111]" />
              </div>

              <div className="mt-6 grid grid-cols-5 gap-3" aria-label="10 Stamp Loyalty Preview">
                {Array.from({ length: TOTAL_STAMPS }, (_, index) => {
                  const isBase = index < BASE_DEMO_STAMPS;
                  const isFromCart = index >= BASE_DEMO_STAMPS && index < filledCount;
                  const isRewardSlot = index === TOTAL_STAMPS - 1;

                  return (
                    <div
                      key={index}
                      className={`flex aspect-square items-center justify-center rounded-full border text-xs font-semibold transition ${
                        isBase
                          ? 'border-[#111111] bg-[#111111] text-[#F2ECE1]'
                          : isFromCart
                            ? 'border-[#9E5531] bg-[#9E5531] text-[#F3EDE2]'
                            : isRewardSlot
                              ? 'border-dashed border-[#9E5531] text-[#9E5531]'
                              : 'border-[#111111]/25 text-[#111111]/45'
                      }`}
                    >
                      {isRewardSlot ? 'FREE' : index + 1}
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 text-[11px] tracking-[0.04em] text-[#111111]/70">
                {t.loyalty.stampsCollected}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
