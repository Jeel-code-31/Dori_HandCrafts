'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Heart, MessageCircle, Plus, Minus, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { openWhatsAppInquiry } from '@/lib/whatsapp';

export interface QuickViewProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  shortDescription: string;
  category: { name: string };
  images: { url: string }[];
  variants?: { id: string; name: string; stock: number; price?: number | null }[];
}

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: QuickViewProduct | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(25);

  if (!product) return null;

  const getImageUrl = (img: any) => (typeof img === 'string' ? img : img?.url || img?.src || '');
  const currentPrice = selectedVariant?.price || product.price;
  const inWishlist = isInWishlist(product.id);

  const handleWhatsAppInquiry = () => {
    openWhatsAppInquiry({
      productName: product.name,
      productSlug: product.slug,
      price: currentPrice,
      quantity,
      variantName: selectedVariant?.name,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C2420]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-[#F9F7F2] max-w-4xl w-full border border-[#D9C5B2] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#8C8378] hover:text-[#2C2420] p-2 bg-[#F9F7F2]/80 backdrop-blur-xs rounded-full transition-colors"
        >
          <X size={22} />
        </button>

        {/* LEFT: Image Gallery */}
        <div className="md:w-1/2 bg-[#D9C5B2]/20 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#D9C5B2]">
          <div className="relative w-full aspect-[4/5] min-h-[250px] max-h-96 overflow-hidden">
            <Image
              src={getImageUrl(product.images[activeImageIdx]) || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto max-w-full pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-14 h-14 shrink-0 border-2 transition-all ${
                    activeImageIdx === idx ? 'border-[#2C2420]' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={getImageUrl(img)} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8C8378] mb-1">
              {product.category?.name}
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl text-[#2C2420] mb-3 leading-tight">
              {product.name}
            </h2>

            {/* Rating Stars */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-[#2C2420]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#2C2420" />
                ))}
              </div>
              <span className="text-xs text-[#8C8378] font-medium">(18 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-1 mb-4">
              <div className="flex items-baseline space-x-3">
                <span className="font-editorial text-2xl font-bold text-[#2C2420]">
                  ₹{(currentPrice * quantity).toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#8C8378] line-through">
                    ₹{(product.compareAtPrice * quantity).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div className="text-xs text-[#8C8378]">
                <span>Unit Price: ₹{currentPrice.toLocaleString('en-IN')} / piece</span>
                <span className="ml-2 font-semibold text-[#2C2420]">(Min. MOQ: 25)</span>
              </div>
            </div>

            <p className="text-xs text-[#8C8378] leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Variant Selectors */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2420] mb-2">
                  {t('pdp.selectVariant')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs px-3 py-1.5 border transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-[#2C2420] bg-[#2C2420] text-[#F9F7F2] font-semibold'
                          : 'border-[#D9C5B2] text-[#2C2420] hover:border-[#2C2420]'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                {t('pdp.quantity')}
              </span>
              <div className="flex items-center border border-[#D9C5B2] bg-[#F9F7F2]">
                <button
                  onClick={() => setQuantity(Math.max(25, quantity - 1))}
                  className="p-2 text-[#2C2420] hover:bg-[#D9C5B2]/30"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-xs font-bold text-[#2C2420]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#2C2420] hover:bg-[#D9C5B2]/30"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#D9C5B2]">
            <div className="flex space-x-3">
              <button
                onClick={handleWhatsAppInquiry}
                className="flex-1 btn-animate text-xs font-bold uppercase tracking-widest py-3.5 flex items-center justify-center space-x-2 transition-colors bg-[#25D366] text-white hover:bg-[#128C7E] border-none shadow-sm"
              >
                <MessageCircle size={16} />
                <span>Inquire MOQ</span>
              </button>

              <button
                onClick={() =>
                  toggleWishlist({
                    productId: product.id,
                    name: product.name,
                    price: currentPrice,
                    image: product.images[0]?.url || '',
                    slug: product.slug,
                  })
                }
                className={`p-3.5 btn-animate transition-colors ${
                  inWishlist
                    ? 'border-red-600 text-red-600 bg-red-50'
                    : 'border-[#D9C5B2] text-[#2C2420]'
                }`}
                title="Wishlist"
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs uppercase tracking-widest text-[#8C8378] hover:text-[#2C2420] font-medium pt-2"
            >
              {t('home.searchViewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
