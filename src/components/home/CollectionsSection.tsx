'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/home/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

interface CollectionItem {
  id?: string;
  name: string;
  slug: string;
  image: string;
}

const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    name: 'Swings',
    slug: 'swing',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0f0a9742-15fd-4d29-a180-548f01275699.png?v=1779256152',
  },
  {
    name: 'Hanging Lights',
    slug: 'hanging-lights',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_529b1fed-29ad-467a-bcf0-331d1312be27.png?v=1781882551',
  },
  {
    name: 'Handbags',
    slug: 'handbags',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_0b85b839-9895-4d6f-aa75-6856e3ac8d11.png?v=1786098129',
  },
  {
    name: 'Crochet Toys',
    slug: 'crochet-toy',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_21a9190d-dfe0-4d73-98b3-2fc59310c213.png?v=1781371820',
  },
  {
    name: 'Cushion Cover',
    slug: 'cushion-cover',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_b79d9d53-41af-4f45-b00b-3a24c449b0f4.png?v=1778507880',
  },
  {
    name: 'Storage',
    slug: 'storage',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_11bbb51b-159a-46bb-bd72-34d79781935c.png?v=1779902854',
  },
  {
    name: 'Table Runner',
    slug: 'table-runner',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_12cbf869-8f48-424e-b143-da9108cd6762.png?v=1778509488',
  },
  {
    name: 'Wall Hanging',
    slug: 'wall-hanging',
    image: 'https://cdn.shopify.com/s/files/1/0804/2863/0268/files/1_d2b9b6da-9fc7-4d90-b73f-6f168c93205f.png?v=1778545712',
  },
];

export default function CollectionsSection() {
  const { t } = useLanguage();
  const [collections, setCollections] = useState<CollectionItem[]>(DEFAULT_COLLECTIONS);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = DEFAULT_COLLECTIONS.map((def) => {
              const found = data.find((c: any) => c.slug === def.slug || c.name.toLowerCase() === def.name.toLowerCase());
              return {
                id: found?.id || def.slug,
                name: def.name,
                slug: def.slug,
                image: found?.image || def.image,
              };
            });
            setCollections(mapped);
          }
        }
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#FDF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <ScrollReveal variant="fade-up" className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8956A] font-bold block mb-4">
            {t('home.collectionsIntro')}
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#2C2420] leading-tight">
            <em className="not-italic text-[#C8956A]">{t('home.collectionsTitle')}</em>
          </h2>
          <p className="text-sm text-[#7A6F65] mt-4 max-w-md mx-auto leading-relaxed font-light">
            {t('home.collectionsSubtitle')}
          </p>
        </ScrollReveal>

        {/* Collections grid — horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.slice(0, 8).map((item, idx) => (
            <ScrollReveal key={item.slug} variant="scale-in" delay={idx * 55}>
              <Link
                href={`/shop?category=${item.slug}`}
                className="group relative block overflow-hidden bg-[#EDE4DC] hover-lift"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                  />
                  {/* Gradient bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/60 via-transparent to-transparent group-hover:from-[#1a1008]/70 transition-all duration-500" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-editorial text-sm sm:text-base text-white leading-tight mb-0.5">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-[#D9C5B2] group-hover:text-white transition-colors duration-300 font-bold">
                    {t('home.collectionsCta')} <ArrowRight size={9} />
                  </span>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C8956A]/50 transition-colors duration-400 pointer-events-none" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
