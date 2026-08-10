'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/home/ScrollReveal';

export default function Story() {
  const pillars = [
    {
      icon: '🌿',
      title: 'Sustainable Materials',
      desc: 'Every piece uses ethically sourced organic cotton, jute, and seagrass.',
    },
    {
      icon: '🤲',
      title: '100% Handmade',
      desc: 'Crafted knot-by-knot by skilled women artisans across rural India.',
    },
    {
      icon: '💛',
      title: 'Fair Wages',
      desc: 'We ensure fair trade pricing that empowers and uplifts each artisan.',
    },
    {
      icon: '🏡',
      title: 'Made for Your Home',
      desc: 'Timeless designs that blend heritage craft with modern living aesthetics.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <ScrollReveal variant="fade-up" className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-4">
            Why Choose Us
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
            We Believe You Are{' '}
            <em className="not-italic text-[#C8956A]">Unique</em>
          </h2>
          <p className="text-sm text-[#7A6F65] mt-5 max-w-xl mx-auto leading-relaxed font-light">
            At Dori Handcrafts, every knot is crafted with passion and attention to detail — making each piece truly one-of-a-kind, just like you.
          </p>
        </ScrollReveal>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((p, idx) => (
            <ScrollReveal key={p.title} variant="fade-up" delay={idx * 90}>
              <div className="bg-white border border-[#EDE4DC] rounded-none p-7 hover-lift-sm group transition-all duration-300 hover:border-[#C8956A]/40 hover:bg-[#FEF7F1]">
                <span className="text-3xl block mb-4">{p.icon}</span>
                <h3 className="font-editorial text-lg text-[#2C2420] mb-2 group-hover:text-[#C8956A] transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-xs text-[#7A6F65] leading-relaxed font-light">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal variant="fade-up" className="text-center">
          <Link
            href="/about"
            className="btn-animate text-xs font-bold uppercase tracking-widest px-10 py-4 inline-block hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300"
          >
            Read More About Us
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
