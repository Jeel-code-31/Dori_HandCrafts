'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/home/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function JournalSection() {
  const { t } = useLanguage();

  const articles = [
    {
      slug: 'behind-the-craft-women-collectives-of-rajasthan',
      title: 'Behind the Craft: Women Collectives of Rajasthan',
      excerpt: 'Discover how organic cotton cords create independent livelihoods for rural artisan women.',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      date: 'August 02, 2026',
      category: 'Community',
    },
    {
      slug: 'styling-handmade-decor-japanese-wabi-sabi-meets-indian-textures',
      title: 'Japanese Wabi-Sabi Meets Indian Textures',
      excerpt: 'How to harmonize unbleached cotton, teak wood, and ambient bamboo lighting.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      date: 'July 24, 2026',
      category: 'Styling',
    },
    {
      slug: 'caring-for-organic-macrame-and-handloom-textiles',
      title: 'Caring for Organic Macramé & Handlooms',
      excerpt: 'Simple timeless care guidelines to ensure your handcrafted wall tapestries last for decades.',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      date: 'July 10, 2026',
      category: 'Care Guide',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <ScrollReveal variant="fade-up">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
              {t('home.journalEyebrow')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
              {t('home.journalTitleLine').split(' & ')[0]} &amp; <em className="not-italic text-[#C8956A]">{t('home.journalTitleLine').split(' & ')[1]}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-left" delay={150}>
            <Link
              href="/journal"
              className="group link-slide icon-bounce inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2C2420] hover:text-[#C8956A] transition-colors self-start sm:self-end mb-1"
            >
              <span>{t('home.journalButton')}</span>
              <ArrowRight size={13} className="icon-arrow group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <ScrollReveal key={article.slug} variant="fade-up" delay={idx * 100}>
              <article className="group flex flex-col overflow-hidden bg-[#FDF9F5] border border-[#EDE4DC] hover:border-[#C8956A]/40 transition-all duration-300 hover-lift h-full">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDE4DC] img-zoom-hover">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.05] transition-all duration-500 img-inner"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] bg-[#C8956A] text-white px-3 py-1 font-bold">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8378]">
                    {article.date}
                  </span>
                  <h3 className="font-editorial text-xl text-[#2C2420] leading-snug group-hover:text-[#C8956A] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#7A6F65] leading-relaxed line-clamp-2 font-light flex-1">
                    {article.excerpt}
                  </p>
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8956A] hover:gap-2.5 transition-all duration-300 mt-1"
                  >
                    <span>{t('home.journalReadMore')}</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
