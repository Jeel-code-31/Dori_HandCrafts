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
                STUDIO DORI
              </span>
              <span className="block text-[9px] tracking-[0.3em] text-[#D9C5B2] uppercase">
                Handcrafted Living
              </span>
            </Link>
            {/* Contact Details */}
            <div className="space-y-2.5 pt-1 text-xs text-[#F9F7F2]/90">
              <div className="flex items-center space-x-2.5">
                <MapPin size={15} className="text-[#D9C5B2] shrink-0" />
                <span className="text-xs font-bold tracking-[0.12em] uppercase">{t('home.footerLocation')}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone size={15} className="text-[#D9C5B2] shrink-0" />
                <a href="tel:+918128184736" className="text-xs font-bold tracking-[0.12em] hover:text-[#D9C5B2] transition-colors">
                  +91 8128184736
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail size={15} className="text-[#D9C5B2] shrink-0" />
                <a href="mailto:support@dorihandcrafts.com" className="text-xs font-bold tracking-[0.12em] hover:text-[#D9C5B2] transition-colors">
                  support@dorihandcrafts.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-[0.22em] font-extrabold text-[#D9C5B2] block mb-3">
                {t('home.footerFollowUs')}
              </span>
              <div className="flex items-center space-x-4 text-xs">
                <a
                  href="https://www.instagram.com/dori_handcrafts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 font-bold tracking-[0.15em] uppercase text-[#F9F7F2]/90 hover:text-[#D9C5B2] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=+917383184736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 font-bold tracking-[0.15em] uppercase text-[#F9F7F2]/90 hover:text-[#D9C5B2] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.201.301-.779.982-.955 1.183-.176.201-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.614.135-.134.301-.351.451-.526.15-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.631-.93-2.235-.244-.585-.494-.506-.678-.515-.176-.008-.377-.01-.578-.01-.201 0-.527.075-.803.377-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.08 2.91 1.23 3.11.15.201 2.126 3.247 5.15 4.554.719.31 1.28.497 1.718.636.722.23 1.378.197 1.897.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.228-.577-.378z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://pin.it/3ey14b2S6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 font-bold tracking-[0.15em] uppercase text-[#F9F7F2]/90 hover:text-[#D9C5B2] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                  <span>Pinterest</span>
                </a>
              </div>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.22em] font-extrabold text-[#D9C5B2] mb-4">
              {t('footer.shopTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('shop.allProducts')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wall-hangings" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Wall Hangings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hanging-lights" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Hanging Lights
                </Link>
              </li>
              <li>
                <Link href="/shop?category=swings" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  Indoor Swings
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
                  {t('nav.collections')}
                </Link>
              </li>
              <li>
                <Link href="/shop?bestSeller=true" className="text-xs font-bold tracking-[0.18em] uppercase text-[#F9F7F2]/80 hover:text-[#D9C5B2] transition-colors">
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
