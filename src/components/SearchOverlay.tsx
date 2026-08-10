'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductResult {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: { name: string };
  images: { url: string }[];
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2C2420]/60 backdrop-blur-xs flex flex-col justify-start pt-16 sm:pt-24 px-4 animate-fade-in">
      <div className="bg-[#F9F7F2] max-w-3xl w-full mx-auto p-6 sm:p-8 shadow-2xl rounded-xs border border-[#D9C5B2] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C8378] hover:text-[#2C2420] p-2 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Input Form */}
        <div className="relative border-b-2 border-[#2C2420] pb-2 flex items-center">
          <Search size={22} className="text-[#8C8378] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('nav.searchPlaceholder')}
            autoFocus
            className="w-full bg-transparent text-xl sm:text-2xl font-editorial text-[#2C2420] placeholder-[#8C8378] focus:outline-hidden"
          />
        </div>

        {/* Suggested Categories / Recent Searches */}
        {!query && (
          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-widest text-[#8C8378] mb-3">{t('home.searchPopular')}</h4>
            <div className="flex flex-wrap gap-2">
              {['Swings', 'Hanging Lights', 'Macrame Wall Tapestry', 'Cushion Covers', 'Table Runners', 'Crochet Toys'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQuery(cat)}
                  className="text-xs bg-[#D9C5B2]/30 hover:bg-[#D9C5B2] text-[#2C2420] px-3 py-1.5 transition-colors border border-[#D9C5B2]/60"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {loading && <div className="mt-8 text-center text-sm text-[#8C8378]">{t('home.searchSearching')}</div>}

        {!loading && query && results.length === 0 && (
          <div className="mt-8 text-center text-[#8C8378] text-sm">
            {t('home.searchEmpty', { query })}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="mt-6 max-h-96 overflow-y-auto divide-y divide-[#D9C5B2]/40 pr-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center space-x-4 py-3 group hover:bg-[#D9C5B2]/10 px-2 transition-colors"
              >
                <div className="relative w-14 h-14 bg-[#D9C5B2]/20 shrink-0 overflow-hidden">
                  <Image
                    src={product.images[0]?.url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-editorial text-lg text-[#2C2420] truncate group-hover:underline">
                    {product.name}
                  </h5>
                  <p className="text-xs text-[#8C8378]">{product.category?.name}</p>
                </div>
                <div className="text-right font-medium text-sm text-[#2C2420]">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                <ArrowRight size={16} className="text-[#8C8378] group-hover:text-[#2C2420] transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
