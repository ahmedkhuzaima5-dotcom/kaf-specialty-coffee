import type { FC } from 'react';

interface SectionHeaderProps {
  italicLead: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Editorial mixed-typography header matching KAF's Instagram campaign hierarchy:
 * italic Cormorant Garamond lead-in + Outfit display title + tight measure copy.
 */
export const SectionHeader: FC<SectionHeaderProps> = ({
  italicLead,
  title,
  subtitle,
  align = 'center',
}) => {
  const alignmentClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-start items-start';

  return (
    <div className={`flex flex-col ${alignmentClass}`}>
      <span className="font-serif italic text-xl sm:text-2xl text-[#C89B65] tracking-normal">
        {italicLead}
      </span>
      <h2 className="mt-1 font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.02em] leading-[1.15] text-[#F3EDE2]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-[60ch] text-sm sm:text-base leading-[1.6] text-[#B5A898]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
