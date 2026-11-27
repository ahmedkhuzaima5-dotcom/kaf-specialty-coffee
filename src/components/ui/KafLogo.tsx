import type { FC } from 'react';

interface KafLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  showWordmark?: boolean;
  className?: string;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg', { mark: number; wordW: number; wordH: number; gap: string }> = {
  sm: { mark: 32, wordW: 54, wordH: 14, gap: 'gap-1' },
  md: { mark: 44, wordW: 72, wordH: 18, gap: 'gap-2' },
  lg: { mark: 68, wordW: 112, wordH: 26, gap: 'gap-3' },
};

/**
 * Exact Square-Kufic spiral emblem + geometric K A F wordmark with
 * signature open-chevron A and warm crema base triangle from @kaf_pk cups.
 */
export const KafLogo: FC<KafLogoProps> = ({
  size = 'md',
  animate = false,
  showWordmark = true,
  className = '',
}) => {
  const dims = SIZE_MAP[size];

  return (
    <span
      className={`inline-flex flex-col items-center justify-center select-none ${dims.gap} ${className}`}
      aria-label="KAF Speciality Coffee"
    >
      <svg
        width={dims.mark}
        height={dims.mark}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 10 10 H 54 V 54 H 10 V 21 H 43 V 43 H 21 V 32 H 32"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          pathLength={1}
          className={animate ? 'kaf-logo-draw' : undefined}
        />
      </svg>

      {showWordmark && (
        <svg
          width={dims.wordW}
          height={dims.wordH}
          viewBox="0 0 120 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={animate ? 'kaf-wordmark-reveal' : undefined}
        >
          {/* Geometric K */}
          <path
            d="M 10 4 V 24 M 24 4 L 11 14 L 24 24"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Open-chevron A + signature crema/gold base triangle */}
          <path
            d="M 49 24 L 60 4 L 71 24"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <polygon points="60,16 55.5,24 64.5,24" fill="#C89B65" />

          {/* Minimalist F */}
          <path
            d="M 96 24 V 4 H 110 M 96 14 H 107"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      )}
    </span>
  );
};
