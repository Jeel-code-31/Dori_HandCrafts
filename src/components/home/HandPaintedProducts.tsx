'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/home/ScrollReveal';

export interface HandPaintedProductsProps {
  products?: any[];
  onQuickView: (product: any) => void;
}

import { FALLBACK_HAND_PAINTED_PRODUCTS } from '@/lib/fallbackProducts';
export { FALLBACK_HAND_PAINTED_PRODUCTS };

export default function HandPaintedProducts({ products, onQuickView }: HandPaintedProductsProps) {
  const displayProducts = products && products.length > 0 ? products : FALLBACK_HAND_PAINTED_PRODUCTS;

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] overflow-hidden border-b border-[#EDE4DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <ScrollReveal variant="fade-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
                Artisanal Hand-Painted Collection
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
                Hand-Painted <em className="not-italic text-[#C8956A]">Work</em>
              </h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Thin accent rule */}
        <ScrollReveal variant="fade" delay={200} className="mb-10">
          <div className="w-full h-[1px] bg-[#EDE4DC] rule-grow" />
        </ScrollReveal>

        {/* Product grid — strictly 6 products on homepage */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayProducts.slice(0, 6).map((prod, idx) => (
            <ScrollReveal
              key={prod.id}
              variant="fade-up"
              delay={idx * 60}
            >
              <div className="hover-lift h-full">
                <ProductCard product={prod} onQuickView={onQuickView} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal variant="fade-up" delay={300} className="mt-12 text-center">
          <Link
            href="/shop?category=hand-painted"
            className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-12 py-4 inline-block"
          >
            Shop Hand-Painted Collection
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
