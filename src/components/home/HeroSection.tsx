'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HERO_SLIDES = [
  {
    src: '/Hero.png',
    alt: 'Dori Handcrafted Living',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152',
    alt: 'Macramé Garden Swing',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712',
    alt: 'Handcrafted Wall Hanging',
  },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(active);
      setAnimating(true);
      setActive((cur) => (cur + 1) % HERO_SLIDES.length);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    }, 3500);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#FDF9F5]">
      {/* Left — Content */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-24 lg:py-0 lg:w-[52%] xl:w-[48%]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 animate-hero-in hero-delay-1">
          <span className="block w-8 h-[1px] bg-[#C8956A]" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold">
            {t('home.heroEyebrow')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-editorial text-5xl pt-20 sm:text-6xl xl:text-7xl text-[#2C2420] leading-[1.05] mb-6 animate-hero-in hero-delay-2">
          <em className="not-italic text-[#C8956A]">{t('home.heroTitle')}</em><br />
        </h1>

        {/* Sub */}
        <p className="text-sm sm:text-base text-[#7A6F65] max-w-sm leading-relaxed mb-10 font-light animate-hero-in hero-delay-3">
          {t('home.heroSubtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-3 animate-hero-in hero-delay-4">
          <Link
            href="/shop?featured=true"
            className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-10 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('home.heroCta')}
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-10 mt-14 pt-10 border-t border-[#E8DDD5] animate-hero-in hero-delay-5">
          {[
            { num: '500+', label: t('home.heroStatArtisans') },
            { num: '2000+', label: t('home.heroStatHomes') },
            { num: '100%', label: t('home.heroStatHandmade') },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-editorial text-3xl text-[#2C2420] block">{s.num}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C8378]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Auto-sliding image panel */}
      <div className="relative lg:w-[48%] xl:w-[52%] h-[55vw] lg:h-auto min-h-[420px] flex-shrink-0 overflow-hidden">

        {/* Slide images */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === active;
          const isPrev = idx === prev;

          let cls = 'absolute inset-0 transition-none';
          if (isActive && animating) {
            cls = 'absolute inset-0 hero-slide-in';
          } else if (isActive && !animating) {
            cls = 'absolute inset-0 opacity-100 translate-x-0';
          } else if (isPrev) {
            cls = 'absolute inset-0 hero-slide-out';
          } else {
            cls = 'absolute inset-0 opacity-0 translate-x-full pointer-events-none';
          }

          return (
            <div key={slide.src} className={cls}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/* Soft left-edge fade */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FDF9F5] to-transparent hidden lg:block z-10" />

        {/* Dot indicators */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrev(active);
                setAnimating(true);
                setActive(idx);
                setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === active
                  ? 'w-6 h-2 bg-[#C8956A]'
                  : 'w-2 h-2 bg-[#C8956A]/40 hover:bg-[#C8956A]/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
