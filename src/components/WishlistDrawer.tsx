'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function WishlistDrawer() {
  const { wishlist, isOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#2C2420]/60 backdrop-blur-xs transition-opacity" onClick={closeWishlist} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F7F2] border-l border-[#D9C5B2] shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-[#D9C5B2] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart size={20} className="text-[#2C2420]" />
              <h3 className="font-editorial text-2xl text-[#2C2420]">{t('wishlist.title')}</h3>
            </div>
            <button onClick={closeWishlist} className="text-[#8C8378] hover:text-[#2C2420] p-1">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={48} className="mx-auto text-[#8C8378] mb-4 opacity-50" />
                <p className="text-[#8C8378] text-sm mb-6">{t('wishlist.empty')}</p>
                <button
                  onClick={closeWishlist}
                  className="btn-animate text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.productId} className="flex space-x-4 pb-4 border-b border-[#D9C5B2]/40">
                  <div className="relative w-20 h-24 bg-[#D9C5B2]/20 shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-editorial text-lg text-[#2C2420] leading-tight">{item.name}</h4>
                      <p className="text-sm font-medium text-[#2C2420] mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <button
                        onClick={() => {
                          addToCart({
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          });
                          toggleWishlist(item);
                        }}
                        className="flex-1 btn-animate text-[11px] font-bold uppercase tracking-wider py-1.5 flex items-center justify-center space-x-1 transition-colors"
                      >
                        <ShoppingBag size={12} />
                        <span>{t('wishlist.moveToCart')}</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-[#8C8378] hover:text-red-700 p-1.5 border border-[#D9C5B2]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
