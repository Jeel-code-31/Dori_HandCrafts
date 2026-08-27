'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { openWhatsAppInquiry } from '@/lib/whatsapp';

export interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    compareAtPrice?: number | null;
    category?: { name: string };
    images: { url: string; isPrimary?: boolean; isSecondary?: boolean }[];
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    sale?: boolean;
  };
  onQuickView?: (product: any) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();

  const imgList = Array.isArray(product.images) ? product.images : [];
  const getUrl = (img: any) => (typeof img === 'string' ? img : img?.url || img?.src || '');
  const primaryImg =
    getUrl(imgList.find((img: any) => typeof img === 'object' && img?.isPrimary)) ||
    getUrl(imgList[0]) ||
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80';
  const secondaryImg =
    getUrl(imgList.find((img: any) => typeof img === 'object' && img?.isSecondary)) ||
    getUrl(imgList[1]) ||
    primaryImg;

  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const categoryName = typeof product.category === 'object' && product.category?.name
    ? product.category.name
    : typeof product.category === 'string'
    ? product.category
    : null;

  return (
    <div
      className="group relative bg-[#F9F7F2] border border-[#D9C5B2]/50 hover:border-[#2C2420]/60 transition-all duration-300 flex flex-col justify-between card-shine"
      onMouseEnter={() => setIsHovered(true)}
      aria-label={product.name}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Crossfade Effect */}
      <div className="relative w-full aspect-[4/5] min-h-[260px] overflow-hidden bg-[#D9C5B2]/20">
        {/* Primary Image */}
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Crossfade Hover Image */}
        <Image
          src={secondaryImg}
          alt={`${product.name} alternate view`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 absolute inset-0 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.sale && discountPercent > 0 && (
            <span className="bg-red-800 text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-xs border border-black-700">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: primaryImg,
              slug: product.slug,
            });
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
            inWishlist
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-[#F9F7F2]/80 text-[#2C2420] hover:bg-[#2C2420] hover:text-[#F9F7F2]'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Action Buttons Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-[#2C2420]/80 via-[#2C2420]/40 to-transparent flex space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="flex-1 btn-animate text-[11px] font-bold uppercase tracking-wider py-2 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Eye size={14} />
              <span>{t('shop.quickView')}</span>
            </button>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="flex-1 btn-animate text-[11px] font-bold uppercase tracking-wider py-2 text-center transition-colors"
          >
            {t('shop.viewProduct')}
          </Link>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {categoryName && (
            <span className="text-[10px] uppercase tracking-widest text-[#8C8378] block mb-1">
              {categoryName}
            </span>
          )}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-editorial text-lg text-[#2C2420] line-clamp-1 hover:underline transition-all duration-300 group-hover:text-[#9E5936]">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#D9C5B2]/40 gap-2">
          <div className="flex items-baseline space-x-2 min-w-0">
            <span className="font-editorial text-lg font-bold text-[#2C2420] truncate">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#8C8378] line-through shrink-0">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              openWhatsAppInquiry({
                productName: product.name,
                productSlug: product.slug,
                price: product.price,
                quantity: 25,
              });
            }}
            className="btn-animate text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center space-x-1.5 shrink-0 shadow-2xs bg-[#25D366] text-white border-none hover:bg-[#128C7E]"
            title="MOQ Inquiry via WhatsApp"
          >
            <MessageCircle size={14} />
            <span>MOQ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
