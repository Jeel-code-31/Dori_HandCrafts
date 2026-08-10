'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JournalPage() {
  const articles = [
    {
      slug: 'behind-the-craft-women-collectives-of-rajasthan',
      title: 'Behind the Craft: The Women Collectives of Western Rajasthan',
      category: 'Artisan Stories',
      date: 'August 02, 2026',
      author: 'Priya Mehta',
      excerpt: 'Discover how raw cotton cord and ancient knotting traditions are creating independent livelihoods for over 150 women artisans.',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    },
    {
      slug: 'styling-handmade-decor-japanese-wabi-sabi-meets-indian-textures',
      title: 'Styling Handmade Decor: Japanese Wabi-Sabi Meets Indian Textures',
      category: 'Interior Guide',
      date: 'July 24, 2026',
      author: 'Dori Editorial',
      excerpt: 'How to harmonize natural unbleached cotton, warm mango wood, and cane lighting to create a serene sanctuary at home.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    },
    {
      slug: 'caring-for-organic-macrame-and-handloom-textiles',
      title: 'Caring for Organic Macrame and Handloom Textiles',
      category: 'Care Guide',
      date: 'July 10, 2026',
      author: 'Studio Dori',
      excerpt: 'Simple timeless care guidelines to ensure your handcrafted wall tapestries and cushions last for decades.',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#D9C5B2] pb-8 mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#8C8378] block mb-1">
            SLOW LIVING STORIES
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2C2420]">
            The Dori Journal
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article key={art.slug} className="bg-[#F9F7F2] border border-[#D9C5B2] flex flex-col justify-between overflow-hidden group">
              <div>
                <div className="relative w-full aspect-[16/10] min-h-[200px] bg-[#D9C5B2]/20 overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#8C8378]">
                    <span>{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h2 className="font-editorial text-2xl text-[#2C2420] group-hover:underline leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-xs text-[#8C8378] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2420] group-hover:text-[#8C8378]">
                  Read Full Article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
