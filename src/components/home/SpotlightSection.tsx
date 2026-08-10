'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ScrollReveal from '@/components/home/ScrollReveal';

interface SpotlightSectionProps {
  product: any;
}

export default function SpotlightSection({ product }: SpotlightSectionProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [imgKey, setImgKey] = useState(0);

  if (!product) return null;

  const handleThumbClick = (idx: number) => {
    setSelectedImgIdx(idx);
    setImgKey((k) => k + 1);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section label */}
        <ScrollReveal variant="fade" className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-[1px] bg-[#EDE4DC] rule-grow" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold whitespace-nowrap">
            Featured Spotlight
          </span>
          <div className="flex-1 h-[1px] bg-[#EDE4DC] rule-grow" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left — Gallery */}
          <ScrollReveal variant="fade-right">
            <div className="space-y-3">
              {/* Main image */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#F5EDE5] img-zoom-hover group">
                <Image
                  key={imgKey}
                  src={product.images[selectedImgIdx]?.url || product.images[0]?.url || 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf'}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover animate-fade-in img-inner"
                />
                {/* Wishlist overlay on image */}
                <button
                  onClick={() => toggleWishlist({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]?.url || '',
                    slug: product.slug,
                  })}
                  className={`absolute top-4 right-4 z-10 p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 ${
                    inWishlist
                      ? 'bg-[#C8956A] text-white'
                      : 'bg-white text-[#2C2420] hover:bg-[#C8956A] hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img: any, idx: number) => (
                    <button
                      key={img.id || idx}
                      onClick={() => handleThumbClick(idx)}
                      className={`relative w-16 h-16 shrink-0 overflow-hidden transition-all duration-300 ${
                        selectedImgIdx === idx
                          ? 'ring-2 ring-[#C8956A] ring-offset-1'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right — Product details */}
          <div className="space-y-6">
            <ScrollReveal variant="fade-up" delay={0}>
              <span className="inline-block text-[9px] uppercase tracking-[0.3em] bg-[#F5EDE5] text-[#C8956A] px-3 py-1.5 font-bold border border-[#E8D5C4]">
                {product.category?.name || 'Handcrafted'}
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={60}>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
                {product.name}
              </h2>
            </ScrollReveal>

            {/* Rating */}
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="flex items-center gap-2">
                <div className="flex text-[#C8956A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#C8956A" />
                  ))}
                </div>
                <span className="text-xs text-[#8C8378]">24 Reviews</span>
              </div>
            </ScrollReveal>

            {/* Price */}
            <ScrollReveal variant="fade-up" delay={140}>
              <div className="flex items-baseline gap-3 py-4 border-y border-[#EDE4DC]">
                <span className="font-editorial text-3xl font-semibold text-[#2C2420]">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-sm text-[#8C8378] line-through">
                      ₹{product.compareAtPrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-white bg-[#C8956A] px-2 py-0.5 uppercase tracking-wider">
                      Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal variant="fade-up" delay={180}>
              <div
                className="text-sm text-[#7A6F65] leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal variant="fade-up" delay={220}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    addToCart({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[selectedImgIdx]?.url || product.images[0]?.url || '',
                      quantity: 1,
                    })
                  }
                  className="flex-1 btn-animate text-xs font-bold uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  className="px-5 py-4 border border-[#EDE4DC] text-[#2C2420] hover:border-[#C8956A] hover:text-[#C8956A] transition-all duration-300"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal variant="fade-up" delay={260}>
              <div className="flex flex-wrap gap-4 pt-4">
                {['Free Shipping over ₹999', 'Handcrafted', 'Easy Returns'].map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#C8956A]" />
                    <span className="text-[10px] text-[#7A6F65] uppercase tracking-wider font-bold">{tag}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
