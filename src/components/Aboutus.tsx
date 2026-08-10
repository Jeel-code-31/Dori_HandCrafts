'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Aboutus() {
  const visionImages = [
    {
      src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      alt: 'Macrame detail crafting',
    },
    {
      src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
      alt: 'Macrame wall hanging and room decor',
    },
    {
      src: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=600&q=80',
      alt: 'Woman in golden light with woven basket',
    },
    {
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      alt: 'Indian women artisans sitting together',
    },
    {
      src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=600&q=80',
      alt: 'Cozy living space with handcrafted swing chair',
    },
    {
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      alt: 'Organic cotton fibers and raw materials',
    },
    {
      src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80',
      alt: 'Group of empowered women artisans in sarees',
    },
    {
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      alt: 'Hands holding a green growing plant',
    },
    {
      src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      alt: 'World map illuminated with ambient fairy lights',
    },
  ];

  return (
    <div className="w-full bg-white  min-h-screen text-[#2C2420] pb-16">
      {/* Page Header */}
      <div className="w-full py-5 text-center bg-white border-b border-[#EEDFCA]">
        <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#2C2420]">
          About us
        </h1>
      </div>

      {/* Main Sections Wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">

        {/* 1. OUR MISSION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch rounded-none overflow-hidden">
          {/* Left Poster Image */}
          <div className="relative min-h-[420px] sm:min-h-[520px] bg-[#FAF2E4]">
            <Image
              src="/images/mission_poster.png"
              alt="Dori Handicrafts Our Mission Poster"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right Text Block */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#2C2420] font-sans uppercase">
              OUR MISSION
            </h2>
            <p className="text-sm sm:text-base text-[#4E4137] leading-[1.8] font-sans font-normal">
              Our mission is to preserve and promote the beauty of handcrafted artistry by creating timeless macrame and lifestyle products that blend traditional craftsmanship with modern aesthetics. We are committed to empowering rural women artisans by providing sustainable livelihood opportunities, encouraging creativity, and supporting financial independence. Through thoughtful design and meaningful craftsmanship, we aim to bring warmth, elegance, and authentic handmade experiences into homes, cafes, villas, and modern spaces around the world.
            </p>
          </div>
        </section>

        {/* 2. OUR VISION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch rounded-none overflow-hidden">
          {/* Left Text Block */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#2C2420] font-sans uppercase">
              OUR VISION
            </h2>
            <p className="text-sm sm:text-base text-[#4E4137] leading-[1.8] font-sans font-normal">
              Our vision is to build Dori Handicrafts into a globally recognized handcrafted lifestyle brand known for timeless design, meaningful craftsmanship, and social impact. We aspire to transform modern spaces with artistic handmade creations while creating a strong community of empowered rural women artisans. By blending tradition with innovation, we envision a future where handmade products are valued not only for their beauty, but also for the stories, culture, and livelihoods they represent.
            </p>
          </div>

          {/* Right 3x3 Photo Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-[#FAF2E4] order-1 md:order-2 min-h-[420px] sm:min-h-[520px]">
            {visionImages.map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. THE FOUNDER SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-stretch rounded-none overflow-hidden">
          {/* Left Founder Image */}
          <div className="relative min-h-[440px] sm:min-h-[540px] bg-[#FAF2E4] flex items-end justify-center">
            <Image
              src="/images/founder.png"
              alt="Tushar Ahir - Founder of Dori Handicrafts"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          </div>

          {/* Right Text Block */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-[#2C2420] font-sans uppercase">
              THE FOUNDER
            </h2>
            <p className="text-sm sm:text-base text-[#4E4137] leading-[1.8] font-sans font-normal">
              Dori Handicrafts was founded by Tushar Ahir with a vision to transform traditional handmade artistry into a modern luxury experience. Inspired by the craft traditions learned from family and driven by a passion for elegant design, the brand began with handcrafted macramé creations and grew into a premium artisan label celebrating timeless craftsmanship. Every piece is thoughtfully handmade with attention to detail, blending heritage techniques with contemporary aesthetics while creating meaningful opportunities for skilled women artisans across India.
            </p>
            <div>
              <Link
                href="/journal"
                className="btn-animate text-xs font-bold uppercase tracking-widest px-6 py-3 inline-block"
              >
               Know More
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}


