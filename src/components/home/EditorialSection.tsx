'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/home/ScrollReveal';

interface EditorialSectionProps {
  products: any[];
  onQuickView: (product: any) => void;
}

export default function EditorialSection({ products, onQuickView }: EditorialSectionProps) {
  const featured = products[0];
  const secondary = products[1];
  const tertiary = products[2];

  if (!featured) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <ScrollReveal variant="fade-up">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
              Editor&apos;s Pick
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
              Curated <em className="not-italic text-[#C8956A]">Collections</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-left" delay={150}>
            <Link
              href="/shop"
              className="group link-slide icon-bounce inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2C2420] hover:text-[#C8956A] transition-colors self-start sm:self-end mb-1"
            >
              <span>Browse All</span>
              <ArrowRight size={13} className="icon-arrow group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Bento-style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Large feature — left */}
          {featured && (
            <ScrollReveal variant="fade-right" className="lg:col-span-7">
              <Link href={`/product/${featured.slug}`} className="group relative block overflow-hidden bg-[#EDE4DC] hover-lift">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/4] lg:h-[600px]">
                  <Image
                    src={featured.images[0]?.url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'}
                    alt={featured.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  {/* Soft gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/70 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="text-[9px] uppercase tracking-[0.25em] bg-[#C8956A] text-white px-3 py-1 font-bold">
                      Featured
                    </span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span className="text-[9px] uppercase tracking-widest text-[#D9C5B2]/80 block mb-2">
                      {featured.category?.name}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-white mb-2 leading-tight">
                      {featured.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-xl text-[#D9C5B2] font-semibold">
                        ₹{featured.price?.toLocaleString('en-IN')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/40 px-4 py-2 group-hover:bg-white group-hover:text-[#2C2420] transition-all duration-300">
                        View Product <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Right column — two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[secondary, tertiary].map((prod, idx) =>
              prod ? (
                <ScrollReveal key={prod.id} variant="fade-up" delay={idx * 120} className="flex-1">
                  <Link href={`/product/${prod.slug}`} className="group relative block overflow-hidden  hover-lift-sm h-full">
                    <div className="relative w-full" style={{ height: '280px' }}>
                      <Image
                        src={prod.images[0]?.url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 41vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/40 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="text-[9px] uppercase tracking-widest text-[#D9C5B2]/70 block mb-1">
                          {prod.category?.name}
                        </span>
                        <div className="flex items-end justify-between">
                          <h3 className="font-editorial text-lg text-white leading-tight max-w-[60%]">
                            {prod.name}
                          </h3>
                          <span className="font-editorial text-base text-[#D9C5B2] font-semibold">
                            ₹{prod.price?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
