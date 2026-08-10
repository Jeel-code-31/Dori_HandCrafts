'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { t } = useLanguage();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountVal = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - discountVal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) setCouponCode('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#2C2420]/60 backdrop-blur-xs transition-opacity" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F7F2] border-l border-[#D9C5B2] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#D9C5B2] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-[#2C2420]" />
              <h3 className="font-editorial text-2xl text-[#2C2420]">{t('cartDrawer.title')}</h3>
            </div>
            <button onClick={closeCart} className="text-[#8C8378] hover:text-[#2C2420] p-1">
              <X size={24} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#D9C5B2]/30 px-6 py-3 border-b border-[#D9C5B2]">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-[#2C2420] mb-1 font-medium">
                {t('cartDrawer.freeShippingThreshold', { amount: `₹${remainingForFreeShipping.toLocaleString('en-IN')}` })}
              </p>
            ) : (
              <p className="text-xs text-[#2C2420] font-semibold mb-1">
                {t('cartDrawer.qualifyFreeShipping')}
              </p>
            )}
            <div className="w-full bg-[#D9C5B2] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#2C2420] h-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag size={48} className="mx-auto text-[#8C8378] mb-4 opacity-50" />
                <p className="text-[#8C8378] text-sm mb-6">{t('cartDrawer.empty')}</p>
                <button
                  onClick={closeCart}
                  className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#8C8378] transition-colors"
                >
                  {t('cartDrawer.continueShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex space-x-4 pb-4 border-b border-[#D9C5B2]/40">
                  <div className="relative w-20 h-24 bg-[#D9C5B2]/20 shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-editorial text-lg text-[#2C2420] leading-tight">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8C8378] hover:text-red-700 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.variantName && (
                        <p className="text-xs text-[#8C8378] mt-0.5">{item.variantName}</p>
                      )}
                      <p className="text-sm font-medium text-[#2C2420] mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 mt-3">
                      <div className="flex items-center border border-[#D9C5B2] bg-[#F9F7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#D9C5B2]/30 text-[#2C2420]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#2C2420]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#D9C5B2]/30 text-[#2C2420]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D9C5B2] bg-[#F9F7F2] space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-[#8C8378]" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (WELCOME10)"
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-8 pr-3 py-1.5 text-xs text-[#2C2420] focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-animate text-xs font-bold uppercase tracking-wider px-3 py-1.5 transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex justify-between items-center bg-[#D9C5B2]/30 px-3 py-1.5 text-xs text-[#2C2420]">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <button onClick={removeCoupon} className="underline text-red-700 hover:text-red-900 ml-2">
                    Remove (-₹{appliedCoupon.discountAmount})
                  </button>
                </div>
              )}

              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.error ? 'text-red-600' : 'text-green-700'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1 text-sm text-[#2C2420]">
                <div className="flex justify-between text-xs text-[#8C8378]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Discount</span>
                    <span>-₹{discountVal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-editorial text-xl pt-2 border-t border-[#D9C5B2]">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-[#8C8378] text-right">{t('cartDrawer.shippingCalc')}</p>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full btn-animate text-xs font-bold uppercase tracking-widest py-4 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>{t('cartDrawer.proceedCheckout')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
