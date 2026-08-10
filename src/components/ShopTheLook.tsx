'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/home/ScrollReveal';

export interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  productId: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function ShopTheLook() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'spot-1',
      xPercent: 48,
      yPercent: 22,
      productId: 'wall-hanging-1',
      slug: 'kyoto-sunburst-macrame-wall-tapestry',
      name: 'Kyoto Sunburst Macrame Wall Tapestry',
      price: 4800,
      category: 'Wall Hangings',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'spot-2',
      xPercent: 28,
      yPercent: 64,
      productId: 'swing-1',
      slug: 'royal-macrame-indoor-swing-jhula',
      name: 'Royal Macrame Indoor Swing Jhula',
      price: 12500,
      category: 'Swings',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'spot-3',
      xPercent: 78,
      yPercent: 72,
      productId: 'cushion-1',
      slug: 'wabi-sabi-hand-tufted-linen-cushion-cover',
      name: 'Wabi-Sabi Hand-Tufted Linen Cushion Cover',
      price: 1650,
      category: 'Cushion Covers',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'spot-4',
      xPercent: 62,
      yPercent: 48,
      productId: 'lamp-1',
      slug: 'woven-bamboo-ambient-pendant-lamp',
      name: 'Woven Bamboo Ambient Pendant Lamp',
      price: 3600,
      category: 'Hanging Lights',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-20 bg-[#F9F7F2] border-t border-[#D9C5B2]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8C8378] block mb-2">
            INTERIOR INSPIRATION
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#2C2420] mb-4">
            {t('home.shopTheLook')}
          </h2>
          <p className="text-sm text-[#8C8378]">
            {t('home.shopTheLookSubtitle')}
          </p>
        </ScrollReveal>

        {/* Scene Container */}
        <ScrollReveal variant="scale-in" delay={150}>
          <div className="relative w-full aspect-[16/9] min-h-[320px] max-h-[700px] border border-[#D9C5B2] shadow-xl overflow-hidden bg-[#2C2420] group hover:shadow-2xl transition-shadow duration-500">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
              alt="Handcrafted luxury living room scene"
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
            />

            {/* Overlay Gradient for contrast */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none group-hover:bg-black/10 transition-colors duration-500" />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
              >
                <button
                  onClick={() => setActiveSpot(activeSpot?.id === spot.id ? null : spot)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeSpot?.id === spot.id
                      ? 'bg-[#2C2420] text-[#F9F7F2] scale-110 shadow-lg rotate-90'
                      : 'bg-[#F9F7F2] text-[#2C2420] animate-hotspot hover:scale-125 active:scale-95'
                  }`}
                  aria-label={`Hotspot for ${spot.name}`}
                >
                  {activeSpot?.id === spot.id ? <X size={16} /> : <Plus size={16} />}
                </button>

                {/* Hotspot Card Overlay */}
                {activeSpot?.id === spot.id && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 w-64 bg-[#F9F7F2] border border-[#D9C5B2] shadow-2xl p-4 z-30 animate-fade-in hover-lift">
                    <div className="relative w-full h-36 bg-[#D9C5B2]/20 mb-3 overflow-hidden img-zoom-hover group/card">
                      <Image src={spot.image} alt={spot.name} fill sizes="256px" className="object-cover img-inner group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C8378] block">
                      {spot.category}
                    </span>
                    <h4 className="font-editorial text-lg text-[#2C2420] line-clamp-1 mb-1">
                      {spot.name}
                    </h4>
                    <div className="font-editorial text-base font-bold text-[#2C2420] mb-3">
                      ₹{spot.price.toLocaleString('en-IN')}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          addToCart({
                            productId: spot.productId,
                            name: spot.name,
                            price: spot.price,
                            image: spot.image,
                            quantity: 1,
                          })
                        }
                        className="flex-1 btn-animate text-[10px] font-bold uppercase tracking-wider py-2 flex items-center justify-center space-x-1 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                      >
                        <ShoppingBag size={12} />
                        <span>+ Cart</span>
                      </button>

                      <Link
                        href={`/product/${spot.slug}`}
                        className="flex-1 btn-animate text-[10px] font-bold uppercase tracking-wider py-2 flex items-center justify-center space-x-1 icon-bounce hover:scale-[1.02] active:scale-[0.98] transition-transform"
                      >
                        <span>View</span>
                        <ArrowRight size={12} className="icon-arrow" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
