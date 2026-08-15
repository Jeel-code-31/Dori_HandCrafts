'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import QuickViewModal, { QuickViewProduct } from '@/components/QuickViewModal';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, X, LayoutGrid, Grid2x2, ChevronDown } from 'lucide-react';

import { FALLBACK_MALACHITE_PRODUCTS } from '@/components/home/MalachiteProducts';

// ─── Fallback categories ──────────────────────────────────────────────────────
const FALLBACK_CATEGORIES = [
  { id: 'malachite', slug: 'malachite', name: 'Malachite Products', _count: { products: 12 } },
  { id: 'swing', slug: 'swing', name: 'Swings', _count: { products: 1 } },
  { id: 'hanging-lights', slug: 'hanging-lights', name: 'Hanging Lights', _count: { products: 1 } },
  { id: 'handbags', slug: 'handbags', name: 'Handbags', _count: { products: 1 } },
  { id: 'crochet-toy', slug: 'crochet-toy', name: 'Crochet Toys', _count: { products: 1 } },
  { id: 'cushion-cover', slug: 'cushion-cover', name: 'Cushion Cover', _count: { products: 1 } },
  { id: 'storage', slug: 'storage', name: 'Storage', _count: { products: 1 } },
  { id: 'table-runner', slug: 'table-runner', name: 'Table Runner', _count: { products: 1 } },
  { id: 'wall-hanging', slug: 'wall-hanging', name: 'Wall Hanging', _count: { products: 1 } },
];

// ─── Fallback products (one per category) — shown when DB is empty ─────────────
const FALLBACK_PRODUCTS = [
  ...FALLBACK_MALACHITE_PRODUCTS,
  {
    id: 'fp-1', slug: 'macrame-wall-hanging-boho', name: 'Boho Wall Hanging',
    description: 'Hand-knotted macramé wall hanging crafted from 100% organic cotton cord by skilled rural artisans.',
    shortDescription: 'Organic cotton macramé wall décor.',
    price: 1299, compareAtPrice: 1799,
    featured: true, newArrival: true, bestSeller: true, sale: true,
    category: { name: 'Wall Hanging', slug: 'wall-hanging' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 10,
  },
  {
    id: 'fp-2', slug: 'handwoven-cushion-cover', name: 'Handwoven Cushion Cover',
    description: 'Textured cushion cover woven on traditional handlooms using naturally dyed cotton threads.',
    shortDescription: 'Naturally dyed handloom cushion.',
    price: 649, compareAtPrice: 899,
    featured: true, newArrival: false, bestSeller: true, sale: true,
    category: { name: 'Cushion Cover', slug: 'cushion-cover' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 10,
  },
  {
    id: 'fp-3', slug: 'jute-handbag-natural', name: 'Natural Jute Handbag',
    description: 'Sturdy yet elegant jute handbag with cotton lining, handstitched by women artisans.',
    shortDescription: 'Eco-friendly handstitched jute bag.',
    price: 999, compareAtPrice: null,
    featured: false, newArrival: true, bestSeller: false, sale: false,
    category: { name: 'Handbags', slug: 'handbags' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 10,
  },
  {
    id: 'fp-4', slug: 'macrame-garden-swing', name: 'Macramé Garden Swing',
    description: 'Handcrafted outdoor swing in braided macramé rope with a solid wooden bar.',
    shortDescription: 'Handcrafted macramé rope swing.',
    price: 3499, compareAtPrice: 4199,
    featured: true, newArrival: false, bestSeller: true, sale: true,
    category: { name: 'Swings', slug: 'swing' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 5,
  },
  {
    id: 'fp-5', slug: 'crochet-amigurumi-toy', name: 'Crochet Amigurumi Toy',
    description: 'Handmade crochet toy using non-toxic cotton yarn — safe and sustainable.',
    shortDescription: 'Non-toxic handmade crochet toy.',
    price: 449, compareAtPrice: null,
    featured: false, newArrival: true, bestSeller: false, sale: false,
    category: { name: 'Crochet Toys', slug: 'crochet-toy' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 15,
  },
  {
    id: 'fp-6', slug: 'macrame-hanging-lamp', name: 'Macramé Hanging Lamp',
    description: 'Statement pendant light shade hand-knotted in organic cotton cord.',
    shortDescription: 'Artisan hand-knotted lamp shade.',
    price: 1899, compareAtPrice: 2499,
    featured: true, newArrival: false, bestSeller: true, sale: true,
    category: { name: 'Hanging Lights', slug: 'hanging-lights' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 8,
  },
  {
    id: 'fp-7', slug: 'woven-storage-basket', name: 'Woven Storage Basket',
    description: 'Handwoven seagrass storage basket — a functional statement piece.',
    shortDescription: 'Handwoven seagrass storage basket.',
    price: 799, compareAtPrice: null,
    featured: false, newArrival: false, bestSeller: false, sale: false,
    category: { name: 'Storage', slug: 'storage' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 12,
  },
  {
    id: 'fp-8', slug: 'handloom-table-runner', name: 'Handloom Table Runner',
    description: 'Elegant handloom cotton table runner with block-print accents.',
    shortDescription: 'Block-print handloom table runner.',
    price: 549, compareAtPrice: 749,
    featured: false, newArrival: true, bestSeller: false, sale: true,
    category: { name: 'Table Runner', slug: 'table-runner' },
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488', isPrimary: true, isSecondary: false }],
    variants: [], reviews: [], stock: 20,
  },
];

function ShopContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState(false);

  // ── Grid mode ──
  const [gridCols, setGridCols] = useState<2 | 4>(4);

  // ── Load more ──
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryParam = searchParams.get('category') || '';
  const featuredParam = searchParams.get('featured');
  const newArrivalParam = searchParams.get('newArrival');
  const bestSellerParam = searchParams.get('bestSeller');

  const [quickViewProd, setQuickViewProd] = useState<QuickViewProduct | null>(null);

  useEffect(() => { setSelectedCategory(categoryParam); }, [categoryParam]);

  // Reset visible count when filters change
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [selectedCategory, sortOption, maxPrice, inStockOnly, featuredParam, newArrivalParam, bestSellerParam]);

  // Fetch products — include FALLBACK_MALACHITE_PRODUCTS if missing from DB
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = `/api/products?sort=${sortOption}&maxPrice=${maxPrice}`;
        if (selectedCategory && selectedCategory !== 'malachite') url += `&category=${selectedCategory}`;
        if (featuredParam) url += `&featured=true`;
        if (newArrivalParam) url += `&newArrival=true`;
        if (bestSellerParam) url += `&bestSeller=true`;
        const res = await fetch(url);
        const data = await res.json();

        let baseProducts = Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;

        // Ensure malachite fallback products are always merged
        const combined = [...baseProducts];
        for (const malProd of FALLBACK_MALACHITE_PRODUCTS) {
          if (!combined.some((p: any) => p.id === malProd.id || p.slug === malProd.slug)) {
            combined.push(malProd);
          }
        }
        setProducts(combined);
      } catch (e) {
        console.error(e);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory, sortOption, maxPrice, featuredParam, newArrivalParam, bestSellerParam]);

  // Fetch categories — ensure Malachite Products category is always available
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        let cats = Array.isArray(data) && data.length > 0 ? data : FALLBACK_CATEGORIES;

        if (!cats.some((c: any) => c.slug === 'malachite')) {
          cats = [
            { id: 'malachite', slug: 'malachite', name: 'Malachite Products', _count: { products: FALLBACK_MALACHITE_PRODUCTS.length } },
            ...cats,
          ];
        }
        setCategories(cats);
      } catch (e) {
        console.error(e);
      }
    }
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    // Filter by stock
    if (inStockOnly && p.stock <= 0) return false;
    // Filter by category (client-side for fallback mode)
    if (selectedCategory) {
      const catSlug = typeof p.category === 'object' ? p.category?.slug : p.category;
      const catName = typeof p.category === 'object' ? p.category?.name : '';
      const isMatch =
        catSlug === selectedCategory ||
        (selectedCategory === 'malachite' &&
          (catSlug?.includes('malachite') || catName?.toLowerCase().includes('malachite')));
      if (!isMatch) return false;
    }
    // Filter by max price (client-side for fallback mode)
    if (p.price > maxPrice) return false;
    // Filter by special flags
    if (featuredParam && !p.featured) return false;
    if (newArrivalParam && !p.newArrival) return false;
    if (bestSellerParam && !p.bestSeller) return false;
    return true;
  });

  const activeCategoryName = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory
    : newArrivalParam ? 'New Arrivals'
      : bestSellerParam ? 'Best Sellers'
        : 'All Products';

  const sortLabels: Record<string, string> = {
    featured: t('shop.sortFeatured'),
    newest: t('shop.sortNewest'),
    best_selling: t('shop.sortBestSelling'),
    price_asc: t('shop.sortPriceLowHigh'),
    price_desc: t('shop.sortPriceHighLow'),
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FDF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-3">
            Handcrafted Living
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
            {activeCategoryName}
          </h1>
          <div className="w-16 h-[2px] bg-[#C8956A] mx-auto mt-4" />
        </div>

        <div className="mb-8 rounded-2xl border border-[#EDE4DC] bg-[#FFFDF9] p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2420] text-sm font-bold text-white">
              1
            </div>
            <div>
              <h2 className="font-editorial text-xl text-[#2C2420]">{t('shop.guideTitle')}</h2>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-start gap-2 rounded-lg border border-[#EDE4DC] bg-white px-3 py-2 text-sm text-[#6F655D]">
                    <span className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8956A]">{step}</span>
                    <span>{t(`shop.guideStep${step}` as any)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* All tab */}
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${selectedCategory === ''
                ? 'bg-[#2C2420] text-white border-[#2C2420]'
                : 'bg-white text-[#7A6F65] border-[#EDE4DC] hover:border-[#C8956A] hover:text-[#C8956A]'
                }`}
            >
              {t('shop.allProducts')}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${selectedCategory === c.slug
                  ? 'bg-[#C8956A] text-white border-[#C8956A]'
                  : 'bg-white text-[#7A6F65] border-[#EDE4DC] hover:border-[#C8956A] hover:text-[#C8956A]'
                  }`}
              >
                {c.name}
                {c._count?.products > 0 && (
                  <span className="ml-1.5 text-[9px] opacity-70">({c._count.products})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Toolbar: sort + grid toggle + mobile filter ── */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EDE4DC]">
          {/* Left: result count + mobile filter btn */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden btn-animate px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <SlidersHorizontal size={13} />
              {t('shop.filters')}
            </button>
            <span className="text-xs text-[#8C8378] hidden sm:inline">
              {t('shop.showingResults', { count: filteredProducts.length })}
            </span>
          </div>

          {/* Right: sort dropdown + grid toggle */}
          <div className="flex items-center gap-3">
            {/* Sort dropdown — custom */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#2C2420] border border-[#EDE4DC] bg-white px-4 py-2 hover:border-[#C8956A] transition-colors duration-200"
              >
                <span>{sortLabels[sortOption]}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#EDE4DC] shadow-lg z-30 w-52">
                  {Object.entries(sortLabels).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => { setSortOption(val); setSortOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${sortOption === val
                        ? 'text-[#C8956A] bg-[#FEF7F1]'
                        : 'text-[#7A6F65] hover:text-[#2C2420] hover:bg-[#FDF9F5]'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid toggle: 2-col / 4-col */}
            <div className="flex items-center border border-[#EDE4DC] bg-white">
              <button
                onClick={() => setGridCols(4)}
                title="4-column grid"
                className={`p-2.5 transition-all duration-200 ${gridCols === 4 ? 'bg-[#2C2420] text-white' : 'text-[#8C8378] hover:text-[#C8956A]'
                  }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setGridCols(2)}
                title="2-column grid"
                className={`p-2.5 transition-all duration-200 ${gridCols === 2 ? 'bg-[#2C2420] text-white' : 'text-[#8C8378] hover:text-[#C8956A]'
                  }`}
              >
                <Grid2x2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Layout: sidebar + product grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 space-y-7 bg-white border border-[#EDE4DC] p-6">
            {/* Categories */}
            <div>
              <h3 className="font-editorial text-lg text-[#2C2420] mb-4 pb-2 border-b border-[#EDE4DC]">
                {t('shop.categories')}
              </h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`flex items-center justify-between w-full text-left py-1.5 px-2 transition-colors duration-200 ${selectedCategory === ''
                    ? 'text-[#C8956A] font-bold bg-[#FEF7F1]'
                    : 'text-[#7A6F65] hover:text-[#2C2420] hover:bg-[#FDF9F5]'
                    }`}
                >
                  <span>{t('shop.allProducts')}</span>
                  <span className="text-[9px] text-[#8C8378]">{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`flex items-center justify-between w-full text-left py-1.5 px-2 transition-colors duration-200 ${selectedCategory === c.slug
                      ? 'text-[#C8956A] font-bold bg-[#FEF7F1]'
                      : 'text-[#7A6F65] hover:text-[#2C2420] hover:bg-[#FDF9F5]'
                      }`}
                  >
                    <span>{c.name}</span>
                    {c._count?.products > 0 && (
                      <span className="text-[9px] text-[#8C8378]">{c._count.products}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-editorial text-lg text-[#2C2420] mb-4 pb-2 border-b border-[#EDE4DC]">
                {t('shop.priceRange')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-[#2C2420] font-bold">
                  <span>₹0</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C8956A]"
                />
                <p className="text-[10px] text-[#8C8378]">Max: ₹{maxPrice.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-editorial text-lg text-[#2C2420] mb-3 pb-2 border-b border-[#EDE4DC]">
                {t('shop.availability')}
              </h3>
              <label className="flex items-center gap-2 text-xs text-[#7A6F65] cursor-pointer hover:text-[#2C2420] transition-colors">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#C8956A] w-3.5 h-3.5"
                />
                <span className="font-bold uppercase tracking-[0.12em]">{t('shop.inStockOnly')}</span>
              </label>
            </div>

            {/* Clear */}
            <button
              onClick={() => { setSelectedCategory(''); setMaxPrice(20000); setInStockOnly(false); }}
              className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8378] border border-[#EDE4DC] py-2.5 hover:border-[#C8956A] hover:text-[#C8956A] transition-all duration-200"
            >
              {t('shop.clearFilters')}
            </button>
          </aside>

          {/* PRODUCT GRID */}
          <main className="lg:col-span-9">
            {loading ? (
              /* Loading skeleton */
              <div className={`grid gap-4 ${gridCols === 4 ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {[...Array(gridCols === 4 ? 8 : 4)].map((_, i) => (
                  <div key={i} className="bg-[#EDE4DC] animate-pulse aspect-[4/5]" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white border border-[#EDE4DC] px-8">
                <span className="text-4xl block mb-4">🧶</span>
                <h3 className="font-editorial text-2xl text-[#2C2420] mb-2">{t('shop.noProducts')}</h3>
                <p className="text-xs text-[#8C8378] mb-6">
                  {t('shop.noProductsSub')}
                </p>
                <button
                  onClick={() => { setSelectedCategory(''); setMaxPrice(20000); setInStockOnly(false); }}
                  className="btn-animate text-xs font-bold uppercase tracking-widest px-8 py-3"
                >
                  {t('shop.clearFilters')}
                </button>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div
                  className={`grid gap-4 transition-all duration-300 ${gridCols === 4
                    ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2'
                    }`}
                >
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProd(p)}
                    />
                  ))}
                </div>

                {/* Load More */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 flex flex-col items-center gap-3">
                    {/* Progress bar */}
                    <div className="w-full max-w-xs bg-[#EDE4DC] h-[3px]">
                      <div
                        className="bg-[#C8956A] h-full transition-all duration-500"
                        style={{ width: `${Math.min((visibleCount / filteredProducts.length) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#8C8378] uppercase tracking-[0.2em] font-bold">
                      Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
                    </p>
                    <button
                      onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                      className="group mt-1 flex items-center gap-3 border border-[#C8956A] text-[#C8956A] bg-white px-10 py-3.5 text-xs font-bold uppercase tracking-[0.25em] hover:bg-[#C8956A] hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{t('shop.loadMore')}</span>
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className="group-hover:rotate-180 transition-transform duration-500"
                      >
                        <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* All loaded message */}
                {visibleCount >= filteredProducts.length && filteredProducts.length > PAGE_SIZE && (
                  <div className="mt-10 text-center">
                    <div className="w-full h-[1px] bg-[#EDE4DC] mb-4" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C8378] font-bold">
                      ✦ {t('shop.allShown', { count: filteredProducts.length })} ✦
                    </p>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-[#2C2420]/60 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-[#FDF9F5] ml-auto p-6 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#EDE4DC]">
              <h3 className="font-editorial text-2xl text-[#2C2420]">{t('shop.filters')}</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#8C8378] hover:text-[#2C2420]">
                <X size={22} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#2C2420] mb-3">
                {t('shop.categories')}
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setSelectedCategory(''); setMobileFilterOpen(false); }}
                  className={`block w-full text-left py-2 px-2 ${selectedCategory === '' ? 'text-[#C8956A] font-bold' : 'text-[#7A6F65]'}`}
                >
                  {t('shop.allProducts')}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCategory(c.slug); setMobileFilterOpen(false); }}
                    className={`block w-full text-left py-2 px-2 ${selectedCategory === c.slug ? 'text-[#C8956A] font-bold' : 'text-[#7A6F65]'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#2C2420] mb-3">
                Max Price: ₹{maxPrice.toLocaleString('en-IN')}
              </h4>
              <input
                type="range" min="1000" max="20000" step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C8956A]"
              />
            </div>

            {/* Sort (mobile) */}
            <div className="mb-8">
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#2C2420] mb-3">{t('shop.sortBy')}</h4>
              <div className="space-y-1 text-xs">
                {Object.entries(sortLabels).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSortOption(val)}
                    className={`block w-full text-left py-2 px-2 ${sortOption === val ? 'text-[#C8956A] font-bold' : 'text-[#7A6F65]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full btn-animate text-xs font-bold uppercase tracking-widest py-3 mt-auto"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <QuickViewModal product={quickViewProd} onClose={() => setQuickViewProd(null)} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-sm text-[#8C8378]">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
