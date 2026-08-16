'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/home/ScrollReveal';

export interface MalachiteProductsProps {
  products?: any[];
  onQuickView: (product: any) => void;
}

export const FALLBACK_MALACHITE_PRODUCTS = [
  {
    id: 'mal-1',
    slug: 'malachite-inlaid-brass-box',
    name: 'Malachite Inlaid Brass Box',
    price: 4999,
    compareAtPrice: 6499,
    category: { name: 'Malachite Decor', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/p2.jpg', isPrimary: true },
      { url: '/images/F/p4.jpg', isSecondary: true },
    ],
  },
   {
    id: 'mal-2',
    slug: 'malachite-candle-holder',
    name: 'Malachite Candle Holder',
    price: 3499,
    compareAtPrice: 4499,
    category: { name: 'Malachite Decor', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/hold.jpg', isPrimary: true },
      { url: '/images/F/hold1.jpg', isSecondary: true },
      
    ],
  },
   {
    id: 'mal-3',
    slug: 'malachite-handcrafted-vase',
    name: 'Malachite Handcrafted Vase',
    price: 5299,
    compareAtPrice: 6799,
    category: { name: 'Malachite Accents', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: false,
    images: [
      { url: '/images/F/product.jpg', isPrimary: true },
      { url: '/images/F/product1.jpg', isSecondary: true },
      { url: '/images/F/product2.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-4',
    slug: 'malachite-gold-table-clock',
    name: 'Malachite & Gold Table Clock',
    price: 5499,
    compareAtPrice: 6999,
    category: { name: 'Malachite Accents', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/s1.jpg', isPrimary: true },
      { url: '/images/F/s2.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-5',
    slug: 'malachite-sculptural-accent',
    name: 'Malachite Sculptural Accent',
    price: 4299,
    compareAtPrice: 5499,
    category: { name: 'Malachite Accents', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/car.jpg', isPrimary: true },
      { url: '/images/F/car2.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-6',
    slug: 'malachite-inlaid-serving-tray',
    name: 'Malachite Inlaid Serving Tray',
    price: 6899,
    compareAtPrice: 8499,
    category: { name: 'Malachite Tableware', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/locate2.jpg', isPrimary: true },
      { url: '/images/F/locate.jpg', isSecondary: true },
    ],
  },

  {
    id: 'mal-7',
    slug: 'malachite-inlaid-serving-tray-luxe',
    name: 'Malachite Inlaid Serving Tray',
    price: 6899,
    compareAtPrice: 8499,
    category: { name: 'Malachite Tableware', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/shap4.jpg', isPrimary: true },
      { url: '/images/F/shap5.jpg', isSecondary: true },
      { url: '/images/F/shap6.jpg', isSecondary: true },
      { url: '/images/F/shap7.jpg', isSecondary: true },
      { url: '/images/F/shap8.jpg', isSecondary: true },
      { url: '/images/F/shap9.jpg', isSecondary: true },
      { url: '/images/F/shap10.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-8',
    slug: 'malachite-gemstone-bowl',
    name: 'Malachite Gemstone Bowl',
    price: 4599,
    compareAtPrice: 5999,
    category: { name: 'Malachite Decor', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/c1.jpg', isPrimary: true },
      { url: '/images/F/c2.jpg', isSecondary: true },
    ],
  },
   {
    id: 'mal-9',
    slug: 'hand-carved-malachite-dish',
    name: 'Hand-Carved Malachite Dish',
    price: 3899,
    compareAtPrice: 4899,
    category: { name: 'Malachite Decor', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: false,
    images: [
      { url: '/images/F/b1.jpg', isPrimary: true },
      { url: '/images/F/b2.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-10',
    slug: 'malachite-marble-coaster-set',
    name: 'Malachite & Marble Coasters',
    price: 2499,
    compareAtPrice: 3299,
    category: { name: 'Malachite Tableware', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/box.jpg', isPrimary: true },
      { url: '/images/F/box1.jpg', isSecondary: true },
    ],
  },
  {
    id: 'mal-11',
    slug: 'malachite-brass-jewelry-box',
    name: 'Malachite & Brass Jewelry Box',
    price: 6199,
    compareAtPrice: 7899,
    category: { name: 'Malachite Accents', slug: 'malachite' },
    sale: true,
    featured: true,
    bestSeller: true,
    images: [
      { url: '/images/F/ring.jpg', isPrimary: true },
      { url: '/images/F/ring1.jpg', isSecondary: true },
      
    ],
  },
];

export default function MalachiteProducts({ products, onQuickView }: MalachiteProductsProps) {
  const displayProducts = products && products.length > 0 ? products : FALLBACK_MALACHITE_PRODUCTS;

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] overflow-hidden border-b border-[#EDE4DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
     
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <ScrollReveal variant="fade-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
                Exclusive Gemstone Collection
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
                Malachite <em className="not-italic text-[#C8956A]">Products</em>
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
            href="/shop?category=malachite"
            className="btn-animate text-xs font-bold uppercase tracking-[0.2em] px-12 py-4 inline-block"
          >
            Shop Malachite Collection
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}