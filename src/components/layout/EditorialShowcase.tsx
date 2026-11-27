import type { FC } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/features/i18n/LanguageContext';

export const EditorialShowcase: FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'winter',
      image: '/images/hot-chocolate-trio.jpg',
      alt: 'Three matte-black KAF hot chocolate cups with pistachio butter pour and cinnamon meringues',
      tag: t.showcase.cards.winterTag,
      title: t.showcase.cards.winterTitle,
      desc: t.showcase.cards.winterDesc,
    },
    {
      id: 'ritual',
      image: '/images/hero-ritual.jpg',
      alt: 'KAF ceramic cup and brass date dish on marble table',
      tag: t.showcase.cards.ritualTag,
      title: t.showcase.cards.ritualTitle,
      desc: t.showcase.cards.ritualDesc,
    },
    {
      id: 'desserts',
      image: '/images/dessert-tubs.jpg',
      alt: 'KAF Tiramisu, Matilda Cake, and Trilece dessert tubs wrapped in ivory paper bands',
      tag: t.showcase.cards.dessertTag,
      title: t.showcase.cards.dessertTitle,
      desc: t.showcase.cards.dessertDesc,
    },
  ] as const;

  return (
    <section id="rituals" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          italicLead={t.showcase.italicLead}
          title={t.showcase.title}
          subtitle={t.showcase.subtitle}
        />

        <div className="mt-8 sm:mt-12 flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="group min-w-[78vw] sm:min-w-[320px] md:min-w-0 snap-start flex flex-col overflow-hidden rounded-2xl border border-[#F3EDE2]/10 bg-[#151210]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#221C18]">
                <img
                  src={pillar.image}
                  alt={pillar.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-4 sm:p-6">
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#C89B65]">
                  {pillar.tag}
                </span>
                <h3 className="mt-1.5 font-sans text-lg sm:text-xl font-normal text-[#F3EDE2]">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-[1.55] text-[#B5A898] line-clamp-2">
                  {pillar.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
