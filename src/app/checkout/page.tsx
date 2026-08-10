'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Check, ShieldCheck, ArrowLeft, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    deliveryMethod: 'standard', // standard or express
    paymentMethod: 'Razorpay',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const shippingFee = formData.deliveryMethod === 'express' ? 350 : (subtotal >= 5000 ? 0 : 250);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      // 1. Initiate Razorpay order architecture via server API
      const rzpRes = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal }),
      });
      const rzpOrder = await rzpRes.json();

      // 2. Create Order in Database
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          customerName: formData.name,
          customerEmail: formData.email,
          phone: formData.phone,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          items: cart.map((c) => ({
            productId: c.productId,
            variantId: c.variantId,
            name: c.name,
            price: c.price,
            quantity: c.quantity,
            image: c.image,
          })),
          subtotal,
          discount: discountAmount,
          shippingFee,
          total: finalTotal,
          paymentMethod: formData.paymentMethod,
          paymentId: rzpOrder.id,
        }),
      });

      const newOrder = await res.json();
      if (res.ok) {
        setOrderConfirmed(newOrder);
        clearCart();
        setStep(5);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== 5) {
    return (
      <div className="pt-32 pb-20 text-center bg-[#F9F7F2]">
        <h2 className="font-editorial text-3xl text-[#2C2420] mb-4">Your Bag is Empty</h2>
        <Link href="/shop" className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest px-6 py-3">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="border-b border-[#D9C5B2] pb-6 mb-8 flex items-center justify-between">
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#2C2420]">
            {t('checkout.title')}
          </h1>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-[#8C8378] hover:text-[#2C2420] flex items-center space-x-1">
            <ArrowLeft size={14} />
            <span>Return to Shop</span>
          </Link>
        </div>

        {/* Step 5: Order Confirmation View */}
        {step === 5 && orderConfirmed ? (
          <div className="max-w-2xl mx-auto text-center py-12 bg-[#F9F7F2] border border-[#D9C5B2] p-8 space-y-6">
            <div className="w-16 h-16 bg-[#2C2420] text-[#F9F7F2] rounded-full flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>

            <h2 className="font-editorial text-3xl text-[#2C2420]">
              {t('checkout.orderSuccessTitle')}
            </h2>

            <p className="text-xs text-[#8C8378]">
              {t('checkout.orderSuccessSub', { orderId: orderConfirmed.orderNumber, email: orderConfirmed.customerEmail })}
            </p>

            <div className="border-t border-b border-[#D9C5B2] py-4 my-4 text-left text-xs space-y-2">
              <p><strong>Order ID:</strong> {orderConfirmed.orderNumber}</p>
              <p><strong>Total Paid:</strong> ₹{orderConfirmed.total.toLocaleString('en-IN')}</p>
              <p><strong>Payment Status:</strong> <span className="text-green-700 font-bold">PAID</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/account"
                className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest px-8 py-3.5"
              >
                {t('checkout.trackOrder')}
              </Link>
              <Link
                href="/shop"
                className="bg-[#D9C5B2] text-[#2C2420] text-xs font-bold uppercase tracking-widest px-8 py-3.5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Checkout Steps & Order Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Multi-Step Forms (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Stepper Tabs Header */}
              <div className="flex border-b border-[#D9C5B2] text-xs font-bold uppercase tracking-widest space-x-6 pb-2 overflow-x-auto no-scrollbar">
                <span className={step === 1 ? 'text-[#2C2420] border-b-2 border-[#2C2420] pb-2' : 'text-[#8C8378]'}>
                  {t('checkout.step1')}
                </span>
                <span className={step === 2 ? 'text-[#2C2420] border-b-2 border-[#2C2420] pb-2' : 'text-[#8C8378]'}>
                  {t('checkout.step2')}
                </span>
                <span className={step === 3 ? 'text-[#2C2420] border-b-2 border-[#2C2420] pb-2' : 'text-[#8C8378]'}>
                  {t('checkout.step3')}
                </span>
                <span className={step === 4 ? 'text-[#2C2420] border-b-2 border-[#2C2420] pb-2' : 'text-[#8C8378]'}>
                  {t('checkout.step4')}
                </span>
              </div>

              {/* STEP 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-4 bg-[#F9F7F2] p-6 border border-[#D9C5B2]">
                  <h3 className="font-editorial text-2xl text-[#2C2420]">Contact Information</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.fullName')}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.email')}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.phone')}</label>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email}
                    className="w-full btn-animate text-xs font-bold uppercase tracking-widest py-3.5 mt-4"
                  >
                    Continue to Shipping →
                  </button>
                </div>
              )}

              {/* STEP 2: Shipping Address */}
              {step === 2 && (
                <div className="space-y-4 bg-[#F9F7F2] p-6 border border-[#D9C5B2]">
                  <h3 className="font-editorial text-2xl text-[#2C2420]">Shipping Address</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.street')}</label>
                    <input
                      type="text"
                      name="street"
                      required
                      placeholder="House/Apartment #, Street Name"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.city')}</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.state')}</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.postalCode')}</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('checkout.country')}</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/3 btn-animate text-xs font-bold uppercase tracking-wider py-3.5"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.street || !formData.city}
                      className="w-2/3 btn-animate text-xs font-bold uppercase tracking-widest py-3.5"
                    >
                      Continue to Delivery →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Delivery Method */}
              {step === 3 && (
                <div className="space-y-4 bg-[#F9F7F2] p-6 border border-[#D9C5B2]">
                  <h3 className="font-editorial text-2xl text-[#2C2420]">Delivery Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-[#D9C5B2] cursor-pointer hover:border-[#2C2420]">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="standard"
                          checked={formData.deliveryMethod === 'standard'}
                          onChange={handleChange}
                          className="accent-[#2C2420]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#2C2420]">Standard Insured Shipping</p>
                          <p className="text-[11px] text-[#8C8378]">Delivered in 3-5 business days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2C2420]">
                        {subtotal >= 5000 ? 'FREE' : '₹250'}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-4 border border-[#D9C5B2] cursor-pointer hover:border-[#2C2420]">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="express"
                          checked={formData.deliveryMethod === 'express'}
                          onChange={handleChange}
                          className="accent-[#2C2420]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#2C2420]">Express Air Courier</p>
                          <p className="text-[11px] text-[#8C8378]">Delivered in 1-2 business days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2C2420]">₹350</span>
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/3 btn-animate text-xs font-bold uppercase tracking-wider py-3.5"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="w-2/3 btn-animate text-xs font-bold uppercase tracking-widest py-3.5"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment */}
              {step === 4 && (
                <div className="space-y-6 bg-[#F9F7F2] p-6 border border-[#D9C5B2]">
                  <h3 className="font-editorial text-2xl text-[#2C2420]">Payment Integration</h3>
                  <div className="p-4 border border-[#2C2420] bg-[#D9C5B2]/20 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard size={18} className="text-[#2C2420]" />
                      <span className="font-bold text-xs text-[#2C2420]">Razorpay Payment Gateway</span>
                    </div>
                    <p className="text-[11px] text-[#8C8378]">
                      Supports Credit/Debit Cards, UPI (GPay, PhonePe), NetBanking & Wallets with 256-bit encryption.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep(3)}
                      className="w-1/3 btn-animate text-xs font-bold uppercase tracking-wider py-4"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={submitting}
                      className="w-2/3 btn-animate text-xs font-bold uppercase tracking-widest py-4 transition-colors"
                    >
                      {submitting ? t('checkout.processingPayment') : t('checkout.placeOrder')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Order Summary (5 Columns) */}
            <aside className="lg:col-span-5 bg-[#F9F7F2] border border-[#D9C5B2] p-6 space-y-6 sticky top-28">
              <h3 className="font-editorial text-2xl text-[#2C2420] pb-3 border-b border-[#D9C5B2]">
                Order Summary
              </h3>

              <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-[#D9C5B2]/20 shrink-0 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-editorial text-sm text-[#2C2420] leading-tight">{item.name}</p>
                        <p className="text-[10px] text-[#8C8378]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-[#2C2420]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-[#D9C5B2] pt-4 text-[#2C2420]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-editorial text-2xl font-bold pt-3 border-t border-[#D9C5B2]">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
