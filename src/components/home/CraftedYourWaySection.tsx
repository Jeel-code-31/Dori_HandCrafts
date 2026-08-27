'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Ruler, Heart, Star } from 'lucide-react';
import ScrollReveal from '@/components/home/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function CraftedYourWaySection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Package,
      title: t('crafted.customColors'),
      desc: t('crafted.customColorsDesc'),
    },
    {
      icon: Ruler,
      title: t('crafted.sizePersonalization'),
      desc: t('crafted.sizePersonalizationDesc'),
    },
    {
      icon: Heart,
      title: t('crafted.handmadeCare'),
      desc: t('crafted.handmadeCareDesc'),
    },
    {
      icon: Star,
      title: t('crafted.uniqueDesigns'),
      desc: t('crafted.uniqueDesignsDesc'),
    },
  ];

  const badges = [
    {
      label: t('trust.handmade'),
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.4}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      label: '100% Handmade',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      label: t('trust.handmadeSub'),
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a7 7 0 0 1 13 0" />
        </svg>
      ),
    },
    {
      label: t('crafted.customizeNow'),
      svg: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.4}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT — Image panel ── */}
          <ScrollReveal variant="fade-right">
            <div className="relative h-full min-h-[420px] lg:min-h-[520px] overflow-hidden group">
              {/* Main image */}
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80"
                alt="Women artisan in handcrafted macramé creation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              />

              {/* Dark bottom gradient for badges legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/80 via-[#1a1008]/10 to-transparent pointer-events-none" />

              {/* Badge strip — bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                <div className="grid grid-cols-4 divide-x divide-white/20 bg-white/10 backdrop-blur-sm border border-white/15">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1.5 py-4 px-2 text-white hover:bg-white/10 transition-colors duration-300"
                    >
                      <span className="text-white/90">{badge.svg}</span>
                      <span className="text-[9px] uppercase tracking-[0.18em] text-white/80 font-bold text-center leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT — Content ── */}
          <div className="flex flex-col justify-center space-y-8 lg:pl-4">
            {/* Heading block */}
            <ScrollReveal variant="fade-up">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
                {t('crafted.uniqueDesigns')}
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight mb-4">
                Crafted <em className="not-italic text-[#C8956A]">Your Way</em>
              </h2>
              <p className="text-sm text-[#7A6F65] leading-relaxed font-light max-w-md">
                {t('crafted.customColorsDesc')}
              </p>
            </ScrollReveal>

            {/* Thin rule */}
            <ScrollReveal variant="fade" delay={80}>
              <div className="w-full h-[1px] bg-[#EDE4DC] rule-grow" />
            </ScrollReveal>

            {/* 2 × 2 features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {features.map((f, idx) => (
                <ScrollReveal key={f.title} variant="fade-up" delay={100 + idx * 80}>
                  <div className="flex items-start gap-4 group">
                    {/* Icon circle */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#FDF9F5] border border-[#EDE4DC] flex items-center justify-center text-[#C8956A] group-hover:bg-[#C8956A] group-hover:text-white group-hover:border-[#C8956A] transition-all duration-300">
                      <f.icon size={17} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="font-editorial text-base text-[#2C2420] leading-snug mb-1 group-hover:text-[#C8956A] transition-colors duration-300">
                        {f.title}
                      </h3>
                      <p className="text-xs text-[#7A6F65] leading-relaxed font-light">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Thin rule */}
            <ScrollReveal variant="fade" delay={420}>
              <div className="w-full h-[1px] bg-[#EDE4DC] rule-grow" />
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal variant="scale-in" delay={480}>
              <Link
                href="/contact"
                className="btn-animate text-xs font-bold uppercase tracking-[0.25em] px-10 py-4 inline-block self-start hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
              >
                {t('crafted.customizeNow')}
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
