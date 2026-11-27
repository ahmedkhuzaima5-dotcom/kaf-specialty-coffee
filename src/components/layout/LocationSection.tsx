import type { FC } from 'react';
import { BedDouble, Car, Clock, ExternalLink, Instagram, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/features/i18n/LanguageContext';

interface LocationSectionProps {
  onStartHotelOrder: () => void;
}

export const LocationSection: FC<LocationSectionProps> = ({ onStartHotelOrder }) => {
  const { t } = useLanguage();

  return (
    <section id="visit" className="py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          italicLead={t.location.italicLead}
          title={t.location.title}
          subtitle={t.location.subtitle}
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Address & Timings Card */}
          <div className="lg:col-span-6 rounded-2xl border border-[#F3EDE2]/12 bg-[#171311] p-5 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C89B65]/30 bg-[#221C18]">
                  <MapPin className="h-5 w-5 text-[#C89B65]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                    {t.location.addressLabel}
                  </span>
                  <p className="mt-1 text-base leading-[1.6] text-[#F3EDE2]">
                    {t.location.addressValue}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C89B65]/30 bg-[#221C18]">
                  <Clock className="h-5 w-5 text-[#C89B65]" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65]">
                    {t.location.hoursLabel}
                  </span>
                  <p className="mt-1 text-base leading-[1.6] text-[#F3EDE2]">
                    {t.location.hoursValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://goo.gl/maps/VUDp5WKDAomsEhWeA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F3EDE2] px-5 py-2.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#0E0C0B] transition hover:bg-[#C89B65] active:scale-[0.98]"
              >
                <span>{t.location.openMaps}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/kaf_pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F3EDE2]/20 bg-[#221C18] px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] active:scale-[0.98]"
              >
                <Instagram className="h-3.5 w-3.5 text-[#C89B65]" aria-hidden="true" />
                <span>{t.location.followInstagram}</span>
              </a>
            </div>
          </div>

          {/* Right Practical Advantages: F-6 Parking + Hotel Room Service */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            <div className="rounded-2xl border border-[#C89B65]/25 bg-[#171311] p-5 sm:p-8 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C89B65]/30 bg-[#221C18]">
                <Car className="h-5 w-5 text-[#C89B65]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-medium text-[#F3EDE2]">
                  {t.location.parkingTipTitle}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-[#B5A898] max-w-[54ch]">
                  {t.location.parkingTipBody}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#9E5531]/35 bg-[#171311] p-5 sm:p-8 flex flex-col justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9E5531]/40 bg-[#221C18]">
                  <BedDouble className="h-5 w-5 text-[#C89B65]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-medium text-[#F3EDE2]">
                    {t.location.hotelServiceTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#B5A898] max-w-[54ch]">
                    {t.location.hotelServiceBody}
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onStartHotelOrder}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C89B65]/40 bg-[#221C18] px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase text-[#C89B65] transition hover:bg-[#C89B65] hover:text-[#0E0C0B] active:scale-[0.98]"
                >
                  {t.location.bookHotelOrder}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
