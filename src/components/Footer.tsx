'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, ArrowRight, Check, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { lang, setLang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2C2420] text-[#F9F7F2] pt-16 pb-12 border-t border-[#8C8378]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#8C8378]/30">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl tracking-wider font-semibold text-[#F9F7F2]">
                Zizziq
              </span>
              <span className="block text-[9px] tracking-[0.3em] text-[#D9C5B2] uppercase">
                Handcrafted Living
              </span>
            </Link>
            {/* Contact Details */}
            <div className="space-y-5 pt-1 text-xl text-[#F9F7F2]/90">
              <div className="flex items-center space-x-5">
                <MapPin size={15} className="text-[#D9C5B2] shrink-0" />
                <span className="text-sm font-bold tracking-[0.12em] uppercase">{t('home.footerLocation')}</span>
              </div>
              <div className="flex items-center space-x-5">
                <Phone size={15} className="text-[#D9C5B2] shrink-0" />
                <a href="tel:+91 8055123450" className="text-sm font-bold tracking-[0.12em] hover:text-[#D9C5B2] transition-colors">
                  +91 8055123450
                </a>
              </div>
              <div className="flex items-center space-x-5">
                <Mail size={15} className="text-[#D9C5B2] shrink-0" />
                <a href="mailto:support@dorihandcrafts.com" className="text-sm font-bold tracking-[0.12em] hover:text-[#D9C5B2] transition-colors">
                 contact@zizziq.com
                </a>
              </div>
            </div>

            {/* Social Links */}
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] font-extrabold text-[#D9C5B2] mb-4">
              {t('footer.shopTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('shop.allProducts')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wall-hangings" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Wall Hangings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hanging-lights" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Hanging Lights
                </Link>
              </li>
              <li>
                <Link href="/shop?category=swings" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Indoor Swings
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('nav.collections')}
                </Link>
              </li>
              <li>
                <Link href="/shop?bestSeller=true" className="text-sm font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('nav.bestSellers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] font-extrabold text-[#D9C5B2] mb-4">
              {t('footer.aboutTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.ourStory')}
                </Link>
              </li>
              <li>
                <Link href="/about#artisans" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.artisans')}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.journal')}
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Craftsmanship
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP & LEGAL Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] font-extrabold text-[#D9C5B2] mb-4">
              {t('footer.helpTitle')} & {t('footer.legalTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact#shipping" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.shippingPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/contact#returns" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/contact#privacy" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Language Selector */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-lg font-medium text-[#8C8378] space-y-0 sm:space-y-0">
          <div>{t('footer.copyright')}</div>

          <div className="flex items-center space-x-2 border border-[#8C8378]/50 px-3 py-1 rounded-xs bg-[#2C2420]">
            <Globe size={14} className="text-[#D9C5B2]" />
            <button
              onClick={() => setLang('en')}
              className={`${lang === 'en' ? 'text-[#F9F7F2] font-bold' : 'text-[#8C8378]'}`}
            >
              EN
            </button>
            <span>|</span>
            <button
              onClick={() => setLang('ja')}
              className={`${lang === 'ja' ? 'text-[#F9F7F2] font-bold' : 'text-[#8C8378]'}`}
            >
              日本語
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
