'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/home/ScrollReveal';

interface CuratedStripSectionProps {
  products: any[];
  onQuickView: (product: any) => void;
}

export default function CuratedStripSection({ products, onQuickView }: CuratedStripSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <ScrollReveal variant="fade-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
                Handpicked for You
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
                Most Loved <em className="not-italic text-[#C8956A]">Products</em>
              </h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Thin accent rule */}
        <ScrollReveal variant="fade" delay={200} className="mb-10">
          <div className="w-full h-[1px] bg-[#EDE4DC] rule-grow" />
        </ScrollReveal>

        {/* Product grid — 4 columns, 2 rows max */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.slice(0, 8).map((prod, idx) => (
            <ScrollReveal
              key={prod.id}
              variant="fade-up"
              delay={idx * 60}
            >
              <div className="hover-lift">
                <ProductCard product={prod} onQuickView={onQuickView} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal variant="fade-up" delay={300} className="mt-12 text-center">
          <Link
            href="/shop"
            className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-12 py-4 inline-block"
          >
            Shop All Products
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
