import type { FC } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { KafLogo } from '@/components/ui/KafLogo';
import { useLanguage } from '@/features/i18n/LanguageContext';

interface HeroProps {
  onOpenSommelier: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenSommelier }) => {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="kaf-hero-glow relative overflow-hidden pt-8 pb-10 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Editorial Typography & Clean 2-Action Bar */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="mb-5 sm:mb-8 text-[#F3EDE2]">
            <span className="inline-flex sm:hidden">
              <KafLogo size="md" animate />
            </span>
            <span className="hidden sm:inline-flex">
              <KafLogo size="lg" animate />
            </span>
          </div>

          <p className="text-xs tracking-[0.08em] uppercase text-[#B5A898]">
            {t.hero.badgeLocation} · {t.hero.badgeHours}
          </p>

          <p className="mt-4 sm:mt-6 font-serif italic text-2xl sm:text-4xl text-[#C89B65]">
            {t.hero.overlineItalic}
          </p>

          <h1 className="mt-1 font-sans text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.08] text-[#F3EDE2]">
            {t.hero.headlineMain}
          </h1>

          <p
            dir="rtl"
            className="mt-2 font-arabic text-base sm:text-xl text-[#C89B65]/90"
          >
            {t.hero.headlineArabic}
          </p>

          <p className="mt-4 max-w-[54ch] text-sm sm:text-base leading-[1.6] text-[#B5A898]">
            {t.hero.description}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F3EDE2] px-6 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#C89B65] active:scale-[0.98]"
            >
              <span>{t.hero.ctaMenu}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onOpenSommelier}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C89B65]/35 bg-[#C89B65]/10 px-5 py-3 text-xs font-medium tracking-[0.06em] uppercase text-[#C89B65] transition hover:bg-[#C89B65]/20 active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.hero.ctaSommelier}</span>
            </button>
          </div>
        </div>

        {/* Right Editorial Photograph Frame */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-[#C89B65]/20 bg-[#171311] shadow-2xl">
            <div className="aspect-[16/10] lg:aspect-[4/5] w-full overflow-hidden">
              <img
                src="/images/hero-ritual.jpg"
                alt="KAF Speciality Coffee morning ritual on Carrara marble"
                width={800}
                height={800}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0C0B] via-[#0E0C0B]/70 to-transparent p-4 sm:p-6">
              <span className="font-serif italic text-lg sm:text-xl text-[#C89B65]">
                {t.hero.cardCaptionItalic}
              </span>
              <p className="mt-0.5 font-sans text-xs sm:text-sm font-normal text-[#F3EDE2]">
                {t.hero.cardCaptionTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
