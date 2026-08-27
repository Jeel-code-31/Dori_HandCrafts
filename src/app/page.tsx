'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CuratedStripSection from '@/components/home/CuratedStripSection';
import EditorialSection from '@/components/home/EditorialSection';
import SpotlightSection from '@/components/home/SpotlightSection';
import CollectionsSection from '@/components/home/CollectionsSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import ShopTheLook from '@/components/ShopTheLook';
import CraftStorySection from '@/components/home/CraftStorySection';
import JournalSection from '@/components/home/JournalSection';
import QuickViewModal, { QuickViewProduct } from '@/components/QuickViewModal';
import Story from '@/components/Story';
import CraftedYourWaySection from '@/components/home/CraftedYourWaySection';
import TrustStrip from '@/components/home/TrustStrip';
import MalachiteProducts from '@/components/home/MalachiteProducts';
import HandPaintedProducts from '@/components/home/HandPaintedProducts';

// Static fallback products — shown whenever the DB returns no data.
// Uses the same Shopify CDN images already referenced in CollectionsSection.
const FALLBACK_PRODUCTS = [
  {
    id: 'fp-1',
    slug: 'macrame-wall-hanging-boho',
    name: 'Boho Wall Hanging',
    description: 'Hand-knotted macramé wall hanging crafted from 100% organic cotton cord by skilled rural artisans.',
    shortDescription: 'Organic cotton macramé wall décor.',
    price: 1299,
    compareAtPrice: 1799,
    featured: true,
    newArrival: true,
    bestSeller: true,
    sale: true,
    category: { name: 'Wall Hanging', slug: 'wall-hanging' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-2',
    slug: 'handwoven-cushion-cover',
    name: 'Handwoven Cushion Cover',
    description: 'Textured cushion cover woven on traditional handlooms using naturally dyed cotton threads.',
    shortDescription: 'Naturally dyed handloom cushion.',
    price: 649,
    compareAtPrice: 899,
    featured: true,
    newArrival: false,
    bestSeller: true,
    sale: true,
    category: { name: 'Cushion Cover', slug: 'cushion-cover' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-3',
    slug: 'jute-handbag-natural',
    name: 'Natural Jute Handbag',
    description: 'Sturdy yet elegant jute handbag with cotton lining, handstitched by women artisans.',
    shortDescription: 'Eco-friendly handstitched jute bag.',
    price: 999,
    compareAtPrice: null,
    featured: false,
    newArrival: true,
    bestSeller: false,
    sale: false,
    category: { name: 'Handbags', slug: 'handbags' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-4',
    slug: 'macrame-garden-swing',
    name: 'Macramé Garden Swing',
    description: 'Handcrafted outdoor swing in braided macramé rope with a solid wooden bar — perfect for gardens and balconies.',
    shortDescription: 'Handcrafted macramé rope swing.',
    price: 3499,
    compareAtPrice: 4199,
    featured: true,
    newArrival: false,
    bestSeller: true,
    sale: true,
    category: { name: 'Swings', slug: 'swing' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-5',
    slug: 'crochet-amigurumi-toy',
    name: 'Crochet Amigurumi Toy',
    description: 'Handmade crochet toy using non-toxic cotton yarn — a safe, sustainable gift for little ones.',
    shortDescription: 'Non-toxic handmade crochet toy.',
    price: 449,
    compareAtPrice: null,
    featured: false,
    newArrival: true,
    bestSeller: false,
    sale: false,
    category: { name: 'Crochet Toys', slug: 'crochet-toy' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-6',
    slug: 'macrame-hanging-lamp',
    name: 'Macramé Hanging Lamp',
    description: 'Statement pendant light shade hand-knotted in organic cotton cord, casting warm patterned shadows.',
    shortDescription: 'Artisan hand-knotted lamp shade.',
    price: 1899,
    compareAtPrice: 2499,
    featured: true,
    newArrival: false,
    bestSeller: true,
    sale: true,
    category: { name: 'Hanging Lights', slug: 'hanging-lights' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-7',
    slug: 'woven-storage-basket',
    name: 'Woven Storage Basket',
    description: 'Handwoven seagrass storage basket — a functional statement piece for every room.',
    shortDescription: 'Handwoven seagrass storage basket.',
    price: 799,
    compareAtPrice: null,
    featured: false,
    newArrival: false,
    bestSeller: false,
    sale: false,
    category: { name: 'Storage', slug: 'storage' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
  {
    id: 'fp-8',
    slug: 'handloom-table-runner',
    name: 'Handloom Table Runner',
    description: 'Elegant handloom cotton table runner with block-print accents — brings artisanal charm to any dining table.',
    shortDescription: 'Block-print handloom table runner.',
    price: 549,
    compareAtPrice: 749,
    featured: false,
    newArrival: true,
    bestSeller: false,
    sale: true,
    category: { name: 'Table Runner', slug: 'table-runner' },
    images: [
      { url: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488', isPrimary: true, isSecondary: false },
    ],
    variants: [],
    reviews: [],
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>(FALLBACK_PRODUCTS);
  const [quickViewProd, setQuickViewProd] = useState<QuickViewProduct | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
        // If DB returns empty, fallback products remain visible
      } catch (e) {
        console.error('Failed to fetch homepage products', e);
      }
    }
    fetchData();
  }, []);

  const spotlightProduct = products.find((p) => p.slug === 'aveline-handbag') || products.find((p) => p.featured) || products[0];
  const bestSellers = products.filter((p) => p.bestSeller);
  const bestSellerMain = bestSellers[0] || products[0];
  const bestSellerGrid = bestSellers.slice(1, 5);

  const malachiteProducts = products.filter(
    (p) =>
      p.category?.slug === 'malachite' ||
      p.category?.name?.toLowerCase().includes('malachite') ||
      p.slug?.includes('malachite')
  );

  const handPaintedProducts = products.filter(
    (p) =>
      p.category?.slug === 'hand-painted' ||
      p.category?.name?.toLowerCase().includes('hand-painted') ||
      p.category?.name?.toLowerCase().includes('hand painted') ||
      p.slug?.includes('hand-painted')
  );

  return (
    <div className="min-h-screen bg-[#FDF9F5]">
      {/* 1. Hero */}
      <HeroSection />
      {/* Trust strip */}
      <TrustStrip />

      {/* Malachite Products (Just before Most Loved Products) */}
      <MalachiteProducts products={malachiteProducts.length > 0 ? malachiteProducts : undefined} onQuickView={setQuickViewProd} />

      {/* Hand-Painted Work Section */}
      <HandPaintedProducts products={handPaintedProducts.length > 0 ? handPaintedProducts : undefined} onQuickView={setQuickViewProd} />

      {/* 2. Curated Strip */}
      <CuratedStripSection products={products.slice(0, 8)} onQuickView={setQuickViewProd} />

      {/* 3. Artisan Editorial */}
      <EditorialSection products={products} onQuickView={setQuickViewProd} />

      {/* 4. Featured Spotlight */}
      {spotlightProduct && <SpotlightSection product={spotlightProduct} />}

      {/* 5. Artisan Collections */}
      <CollectionsSection />

      {/* 5b. Crafted Your Way */}
      <CraftedYourWaySection />

      {/* 6. Best Sellers */}
      <BestSellersSection mainProduct={bestSellerMain} gridProducts={bestSellerGrid} onQuickView={setQuickViewProd} />

      {/* 7. Shop The Look */}
      <ShopTheLook />

      {/* 8. Craft Story */}
      <CraftStorySection />

      {/* Quick View Modal */}
      <QuickViewModal product={quickViewProd} onClose={() => setQuickViewProd(null)} />
    </div>
  );
}
