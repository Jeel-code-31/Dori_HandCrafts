'use client';

import React from 'react';
import { Truck, Scissors, ShieldCheck, Headphones } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TrustStrip() {
  const { t } = useLanguage();

  const strips = [
    {
      Icon: Truck,
      label: t('trust.shipping'),
      sub: t('trust.freeShipping'),
    },
    {
      Icon: Scissors,
      label: t('trust.handmade'),
      sub: t('trust.handmadeSub'),
    },
    {
      Icon: ShieldCheck,
      label: t('trust.secured'),
      sub: t('trust.securedSub'),
    },
    {
      Icon: Headphones,
      label: t('trust.contact'),
      sub: 'support@dorihandcrafts.com',
    },
  ];

  return (
    <div className="bg-[#FDF9F5] border-y border-[#EDE4DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#EDE4DC]">
          {strips.map(({ Icon, label, sub }, idx) => (
            <div
              key={label}
              className={`group flex items-center gap-4 px-6 py-5 sm:py-6 transition-colors duration-300 hover:bg-white ${
                idx === 1 ? 'border-r border-[#EDE4DC] lg:border-r-0' : ''
              }`}
            >
              {/* Icon */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#F5EDE5] border border-[#E8D5C4] flex items-center justify-center text-[#C8956A] group-hover:bg-[#C8956A] group-hover:text-white group-hover:border-[#C8956A] transition-all duration-300">
                <Icon size={18} strokeWidth={1.6} />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.25em] font-bold text-[#2C2420] group-hover:text-[#C8956A] transition-colors duration-300 truncate">
                  {label}
                </span>
                <span className="block text-[11px] text-[#7A6F65] font-light mt-0.5 truncate">
                  {sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
