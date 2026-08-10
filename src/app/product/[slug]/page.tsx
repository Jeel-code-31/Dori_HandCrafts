'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck, RotateCcw, Maximize2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care' | 'shipping' | 'reviews'>('details');
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${resolvedParams.slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        // Fetch related products in category
        const relRes = await fetch(`/api/products?category=${data.category?.slug}`);
        const relData = await relRes.json();
        if (Array.isArray(relData)) {
          setRelated(relData.filter((p: any) => p.id !== data.id).slice(0, 4));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="pt-32 text-center text-sm text-[#8C8378]">Loading handcrafted masterpiece...</div>;
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center bg-[#F9F7F2]">
        <h2 className="font-editorial text-3xl text-[#2C2420] mb-4">Product Not Found</h2>
        <Link href="/shop" className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest px-6 py-3">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const inWishlist = isInWishlist(product.id);
  const images = product.images || [];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: images[0]?.url || '',
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    setReviewSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setProduct((prev: any) => ({
          ...prev,
          reviews: [newReview, ...(prev.reviews || [])],
        }));
        setReviewSuccess(true);
        setReviewName('');
        setReviewComment('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#8C8378] mb-8 flex items-center space-x-2">
          <Link href="/" className="hover:text-[#2C2420]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#2C2420]">Shop</Link>
          <span>/</span>
          <span className="text-[#2C2420] font-medium">{product.name}</span>
        </nav>

        {/* TOP SECTION: Gallery & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* LEFT: Product Image Gallery (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full aspect-[4/5] min-h-[300px] border border-[#D9C5B2] shadow-sm bg-[#D9C5B2]/20 overflow-hidden group">
              <Image
                src={images[selectedImgIdx]?.url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <button
                onClick={() => setFullscreenImg(images[selectedImgIdx]?.url || null)}
                className="absolute top-4 right-4 bg-[#F9F7F2]/80 backdrop-blur-xs p-2 text-[#2C2420] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-3">
                {images.map((img: any, idx: number) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`relative aspect-square border-2 transition-all overflow-hidden ${
                      selectedImgIdx === idx ? 'border-[#2C2420]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <Image src={img.url} alt="" fill sizes="100px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Specs & Buy Controls (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8C8378] block mb-1">
                {product.category?.name}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#2C2420] mb-3">
                {product.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-[#2C2420]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#2C2420" />
                  ))}
                </div>
                <span className="text-xs text-[#8C8378] font-medium">
                  ({product.reviews?.length || 12} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-4 mb-4">
                <span className="font-editorial text-3xl font-bold text-[#2C2420]">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#8C8378] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#8C8378] leading-relaxed font-light mb-6">
                {product.shortDescription}
              </p>
            </div>

            {/* Variant Selectors */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 border-t border-[#D9C5B2] pt-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                  {t('pdp.selectVariant')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-xs px-4 py-2 border transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-[#2C2420] bg-[#2C2420] text-[#F9F7F2] font-bold'
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
            <div className="flex items-center space-x-4 border-t border-[#D9C5B2] pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                {t('pdp.quantity')}
              </span>
              <div className="flex items-center border border-[#D9C5B2] bg-[#F9F7F2]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#2C2420] hover:bg-[#D9C5B2]/30"
                >
                  <Minus size={14} />
                </button>
                <span className="px-5 text-xs font-bold text-[#2C2420]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#2C2420] hover:bg-[#D9C5B2]/30"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#D9C5B2]">
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-animate text-xs font-bold uppercase tracking-widest py-4 flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag size={16} />
                  <span>{t('shop.addToCart')}</span>
                </button>

                <button
                  onClick={() =>
                    toggleWishlist({
                      productId: product.id,
                      name: product.name,
                      price: currentPrice,
                      image: images[0]?.url || '',
                      slug: product.slug,
                    })
                  }
                  className={`p-4 btn-animate transition-colors ${
                    inWishlist
                      ? 'border-red-600 text-red-600 bg-red-50'
                      : 'border-[#D9C5B2] text-[#2C2420]'
                  }`}
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full btn-animate text-xs font-bold uppercase tracking-widest py-4 transition-colors"
              >
                {t('pdp.buyNow')}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#D9C5B2] text-center text-[10px] text-[#8C8378]">
              <div className="p-2 border border-[#D9C5B2]/40">
                <ShieldCheck size={18} className="mx-auto mb-1 text-[#2C2420]" />
                <span>100% Authentic Handcraft</span>
              </div>
              <div className="p-2 border border-[#D9C5B2]/40">
                <Truck size={18} className="mx-auto mb-1 text-[#2C2420]" />
                <span>Insured Global Shipping</span>
              </div>
              <div className="p-2 border border-[#D9C5B2]/40">
                <RotateCcw size={18} className="mx-auto mb-1 text-[#2C2420]" />
                <span>7-Day Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-[#D9C5B2]/70 bg-[#FFFDF9] p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8956A]">{t('pdp.howToBuy')}</p>
              <h3 className="font-editorial text-2xl text-[#2C2420] mt-1">{t('pdp.howToBuy')}</h3>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.24em] text-[#2C2420] hover:text-[#C8956A]">
              {t('pdp.backToShop')}
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[t('pdp.buyStep1'), t('pdp.buyStep2'), t('pdp.buyStep3')].map((step, index) => (
              <div key={step} className="rounded-xl border border-[#D9C5B2]/60 bg-white px-4 py-3 text-sm text-[#6F655D]">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#C8956A]">Step {index + 1}</span>
                {step}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#6F655D]">{t('pdp.needHelp')}</p>
        </div>

        {/* BOTTOM SECTION: Tabs & Reviews */}
        <div className="border-t border-[#D9C5B2] pt-12">
          {/* Navigation Tabs */}
          <div className="flex border-b border-[#D9C5B2] space-x-8 overflow-x-auto no-scrollbar mb-8">
            {[
              { id: 'details', label: t('pdp.productDetails') },
              { id: 'materials', label: t('pdp.materialsAndSpecs') },
              { id: 'care', label: t('pdp.careInstructions') },
              { id: 'shipping', label: t('pdp.shippingInfo') },
              { id: 'reviews', label: `${t('pdp.customerReviews')} (${product.reviews?.length || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all relative ${
                  activeTab === tab.id ? 'text-[#2C2420]' : 'text-[#8C8378] hover:text-[#2C2420]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C2420]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl space-y-4 text-sm text-[#2C2420]/90 leading-relaxed font-light">
            {activeTab === 'details' && <p>{product.description}</p>}

            {activeTab === 'materials' && (
              <div className="space-y-2">
                <p><strong>Material:</strong> {product.material || 'Organic Cotton & Solid Wood'}</p>
                <p><strong>Dimensions:</strong> {product.dimensions || 'Standard Craft Size'}</p>
                <p><strong>Color:</strong> {product.color || 'Natural Warm Beige'}</p>
                <p><strong>SKU:</strong> {product.SKU}</p>
              </div>
            )}

            {activeTab === 'care' && (
              <p>{product.careInstructions || 'Spot clean with a gentle damp cloth. Avoid harsh chemicals.'}</p>
            )}

            {activeTab === 'shipping' && (
              <p>{product.shippingInformation || 'Handcrafted on order. Ships within 3-5 business days across India and internationally.'}</p>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Existing Reviews */}
                <div className="space-y-4">
                  {product.reviews?.map((r: any) => (
                    <div key={r.id} className="p-4 bg-[#D9C5B2]/10 border border-[#D9C5B2]/40">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-[#2C2420]">{r.userName}</span>
                        <div className="flex text-[#2C2420]">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} size={12} fill="#2C2420" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#8C8378]">{r.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Write Review Form */}
                <div className="p-6 bg-[#F9F7F2] border border-[#D9C5B2]">
                  <h4 className="font-editorial text-xl text-[#2C2420] mb-4">{t('pdp.writeReview')}</h4>
                  {reviewSuccess ? (
                    <p className="text-xs text-green-700">Thank you for sharing your review!</p>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2C2420] mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="bg-[#F9F7F2] border border-[#D9C5B2] text-xs p-2 focus:outline-hidden"
                        >
                          <option value="5">5 Stars - Outstanding</option>
                          <option value="4">4 Stars - Excellent</option>
                          <option value="3">3 Stars - Average</option>
                          <option value="2">2 Stars - Poor</option>
                          <option value="1">1 Star - Very Poor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2C2420] mb-1">{t('pdp.yourName')}</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2 text-xs focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2C2420] mb-1">Review</label>
                        <textarea
                          rows={3}
                          required
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder={t('pdp.yourReview')}
                          className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2 text-xs focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={reviewSubmitting}
                        className="btn-animate text-xs font-bold uppercase tracking-widest px-6 py-2.5"
                      >
                        {t('pdp.submitReview')}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#D9C5B2]">
            <h3 className="font-editorial text-3xl text-[#2C2420] mb-8 text-center sm:text-left">
              {t('pdp.relatedProducts')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-t border-[#D9C5B2] p-3 px-4 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#8C8378] block font-bold">Total</span>
          <span className="font-editorial text-lg font-bold text-[#2C2420]">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 btn-animate text-xs font-bold uppercase tracking-widest py-3 flex items-center justify-center space-x-2"
        >
          <ShoppingBag size={16} />
          <span>{t('shop.addToCart')}</span>
        </button>
      </div>

      {/* Lightbox Fullscreen Image Modal */}
      {fullscreenImg && (
        <div className="fixed inset-0 z-50 bg-[#2C2420]/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenImg(null)}
            className="absolute top-6 right-6 text-white p-2"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image src={fullscreenImg} alt="" fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
