'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import QuickViewModal, { QuickViewProduct } from '@/components/QuickViewModal';

interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const CATEGORIES_LIST: CategoryItem[] = [
  {
    name: 'Swings',
    slug: 'swing',
    description: 'Handwoven macrame indoor swings & jhulas for cozy living.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152',
  },
  {
    name: 'Hanging Lights',
    slug: 'hanging-lights',
    description: 'Ambient handcrafted macrame pendant light shades.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551',
  },
  {
    name: 'Handbags',
    slug: 'handbags',
    description: 'Statement woven T-shirt yarn sling bags & totes.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129',
  },
  {
    name: 'Crochet Toys',
    slug: 'crochet-toy',
    description: 'Soft organic cotton handcrafted crochet animal plushies.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820',
  },
  {
    name: 'Cushion Cover',
    slug: 'cushion-cover',
    description: 'Textured boho macrame cushion covers for sofas and beds.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880',
  },
  {
    name: 'Storage',
    slug: 'storage',
    description: 'Handcrafted macrame organiser baskets & caddies.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854',
  },
  {
    name: 'Table Runner',
    slug: 'table-runner',
    description: 'Elegant fringe macrame table runners for dining spaces.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488',
  },
  {
    name: 'Tent',
    slug: 'tent',
    description: 'Handmade macrame play tents and canopy retreats.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/front-1.jpg?v=1779297396',
  },
  {
    name: 'Wall Hanging',
    slug: 'wall-hanging',
    description: 'Intricate boho macrame tapestries and wall art.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712',
  },
  {
    name: 'Wall Hanging Shelf',
    slug: 'wall-hanging-shelf',
    description: 'Macrame wall hangings integrated with solid wooden floating shelves.',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_47738342-b756-4369-8939-05420cd0455f.png?v=1782630910',
  },
];

export default function CollectionsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProd, setQuickViewProd] = useState<QuickViewProduct | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch collections products', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 pt-6">
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#9E5936] tracking-tight">
            Curated Collections
          </h1>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center space-x-2 my-3 text-[#D98A5B]">
            <span className="text-[10px]">♦</span>
            <span className="w-8 h-[1px] bg-[#D98A5B]/40"></span>
            <span className="text-xs">♦</span>
            <span className="w-8 h-[1px] bg-[#D98A5B]/40"></span>
            <span className="text-[10px]">♦</span>
          </div>

          <p className="text-xs sm:text-sm text-[#7A6F65] leading-relaxed font-light">
            Discover thoughtfully handcrafted pieces designed to bring warmth and character to every space.
          </p>
        </div>

        {/* 1. TOP CATEGORIES GRID (Click to Jump to Category Section) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {CATEGORIES_LIST.map((item) => (
            <button
              key={item.slug}
              onClick={() => scrollToSection(item.slug)}
              className="group relative w-full aspect-[3/4.2] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#D9C5B2]/20 border border-[#D9C5B2]/40 text-left cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

             
              <div className="absolute bottom-4 sm:bottom-6 left-2 right-2 text-center">
                <h3 className="font-editorial text-base sm:text-xl font-bold text-white tracking-wide drop-shadow-md group-hover:translate-y-[-2px] transition-transform duration-300">
                  {item.name}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* 2. BIFURCATED CATEGORY SECTIONS WITH PRODUCTS */}
        {loading ? (
          <div className="text-center py-20 text-sm text-[#8C8378]">Loading artisan collections...</div>
        ) : (
          <div className="space-y-20">
            {CATEGORIES_LIST.map((cat) => {
              // Filter products belonging to this category
              const catProducts = products.filter(
                (p) => p.category?.slug === cat.slug || p.categoryId === cat.slug
              );

              return (
                <section
                  key={cat.slug}
                  id={cat.slug}
                  className="scroll-mt-28 border-t border-[#D9C5B2]/60 pt-12"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#9E5936] font-bold block mb-1">
                        HANDCRAFTED COLLECTION
                      </span>
                      <h2 className="font-editorial text-3xl sm:text-4xl text-[#2C2420]">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-[#8C8378] mt-1 font-light max-w-xl">
                        {cat.description}
                      </p>
                    </div>

                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#9E5936] hover:text-[#2C2420] transition-colors"
                    >
                      <span>Explore All {cat.name} ({catProducts.length})</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Products Grid */}
                  {catProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                      {catProducts.map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          onQuickView={(p) => setQuickViewProd(p)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 bg-[#F9F7F2] border border-[#D9C5B2]/40 text-center rounded-xl">
                      <p className="text-xs text-[#8C8378] mb-3">
                        New handcrafted items for {cat.name} are coming soon to our catalog.
                      </p>
                      <Link
                        href={`/shop?category=${cat.slug}`}
                        className="btn-animate-light text-xs font-bold uppercase tracking-widest px-5 py-2.5 inline-block"
                      >
                        Browse Related Items
                      </Link>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal product={quickViewProd} onClose={() => setQuickViewProd(null)} />
    </div>
  );
}
