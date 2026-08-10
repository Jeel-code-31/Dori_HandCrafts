'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/home/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function CraftStorySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] relative overflow-hidden">
      {/* Decorative bg text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[160px] font-editorial text-[#EDE4DC] leading-none select-none pointer-events-none hidden lg:block pr-4 animate-float-soft">
        Dori
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <ScrollReveal variant="fade-right">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden img-zoom-hover group bg-[#EDE4DC]">
                <Image
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                  alt="Women artisan spinning cotton cord"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover img-inner group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#C8956A] text-white p-5 sm:p-7 max-w-[200px] hover-lift animate-float-soft">
                <span className="font-editorial text-4xl font-semibold block leading-none">500+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 mt-1.5 block">
                  Rural Artisans Empowered
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <div className="space-y-7 lg:pl-4">
            <ScrollReveal variant="fade-up">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-4">
                {t('home.craftStoryEyebrow')}
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
                {t('home.craftStoryTitleLine')}<br />
                <em className="not-italic text-[#C8956A]">{t('home.craftStoryTitleAccent')}</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <p className="text-sm text-[#7A6F65] leading-relaxed font-light">
                {t('home.craftStoryDescription')}
              </p>
            </ScrollReveal>

            {/* Values */}
            <ul className="space-y-3 pt-2">
              {[
                { title: t('home.craftStoryValue1'), icon: '💛' },
                { title: t('home.craftStoryValue2'), icon: '🌿' },
                { title: t('home.craftStoryValue3'), icon: '🤲' },
              ].map((item, idx) => (
                <ScrollReveal key={item.title} variant="fade-left" delay={150 + idx * 80} as="li">
                  <div className="flex items-center gap-3 text-sm text-[#7A6F65] font-light bg-white border border-[#EDE4DC] px-4 py-3 hover:border-[#C8956A]/40 hover:bg-[#FEF7F1] transition-all duration-300 group">
                    <span className="text-base">{item.icon}</span>
                    <span className="group-hover:text-[#2C2420] transition-colors duration-300">{item.title}</span>
                  </div>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal variant="scale-in" delay={380}>
              <Link
                href="/about"
                className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 inline-block hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300"
              >
                {t('home.craftStoryButton')}
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
