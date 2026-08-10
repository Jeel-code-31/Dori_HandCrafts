'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/home/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

interface BestSellersSectionProps {
  mainProduct: any;
  gridProducts: any[];
  onQuickView: (product: any) => void;
}

export default function BestSellersSection({ mainProduct, gridProducts, onQuickView }: BestSellersSectionProps) {
  const { t } = useLanguage();

  if (!mainProduct) return null;

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <ScrollReveal variant="fade-left">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
              {t('home.bestsellerEyebrow')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
              {t('home.bestsellerTitle').split(' ')[0]} <em className="not-italic text-[#C8956A]">{t('home.bestsellerTitle').split(' ').slice(1).join(' ')}</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-right" delay={150}>
            <Link
              href="/shop?sort=bestseller"
              className="group link-slide icon-bounce inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2C2420] hover:text-[#C8956A] transition-colors self-start sm:self-end mb-1"
            >
              <span>{t('home.bestsellerButton')}</span>
              <ArrowRight size={13} className="icon-arrow group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <ScrollReveal variant="fade" delay={100} className="mb-12">
          <div className="w-full h-[1px] bg-[#EDE4DC] rule-grow" />
        </ScrollReveal>

        {/* Product layout — featured left + grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main featured bestseller — larger */}
          <ScrollReveal variant="fade-up" className="lg:col-span-5">
            <div className="hover-lift">
              <ProductCard product={mainProduct} onQuickView={onQuickView} />
            </div>
          </ScrollReveal>

          {/* Side grid — 2 cols */}
          {gridProducts.length > 0 && (
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {gridProducts.slice(0, 4).map((prod, idx) => (
                <ScrollReveal key={prod.id} variant="fade-up" delay={idx * 90}>
                  <div className="hover-lift-sm">
                    <ProductCard product={prod} onQuickView={onQuickView} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* If no grid products, show more single-col cards */}
          {gridProducts.length === 0 && (
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="text-center py-8">
                <p className="text-sm text-[#8C8378] font-light">{t('home.bestsellerComingSoon')}</p>
                <Link href="/shop" className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-8 py-3 inline-block mt-4">
                  {t('home.browseShop')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
