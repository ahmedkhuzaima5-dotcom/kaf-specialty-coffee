import type { FC } from 'react';
import { KafLogo } from '@/components/ui/KafLogo';
import { useLanguage } from '@/features/i18n/LanguageContext';

export const Footer: FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#F3EDE2]/10 bg-[#0B0908] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-4">
        <KafLogo size="md" className="text-[#F3EDE2]" />

        <p dir="rtl" className="mt-2 font-arabic text-xl text-[#C89B65]">
          {t.footer.quoteArabic}
        </p>
        <p className="font-serif italic text-base text-[#B5A898]">
          “{t.footer.quoteEnglish}”
        </p>

        <div className="mt-4 border-t border-[#F3EDE2]/10 pt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#B5A898]">
          <span>{t.footer.rights}</span>
          <span className="text-[#C89B65]/80">{t.footer.prototypeNote}</span>
        </div>
      </div>
    </footer>
  );
};
