'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/i18n/translations';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { openCart, totalItems } = useCart();
  const { openWishlist, wishlist } = useWishlist();
  const { user, isAdmin } = useAuth();

  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  const navLinks = [
    { href: '/shop', label: t('nav.shop') },
    { href: '/collections', label: t('nav.collections') },
    { href: '/about', label: t('nav.about') },
    { href: '/journal', label: t('blog') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F9F7F2] border-b border-[#D9C5B2]/40 py-2 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center space-x-4 lg:space-x-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#2C2420] p-1.5 hover:bg-[#D9C5B2]/20 rounded-xs transition-colors"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu size={24} />
            </button>

            <Link href="/" className="group flex flex-col justify-center">
              <span className="font-editorial text-2xl sm:text-3xl tracking-wider text-[#2C2420] font-semibold leading-none">
                STUDIO DORI
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8C8378] uppercase mt-1 group-hover:text-[#2C2420] transition-colors leading-none">
                Handcrafted Living
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links (Aligned Perfectly) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-[0.18em] uppercase transition-all hover:text-[#8C8378] relative py-1.5 ${
                  pathname === link.href ? 'text-[#2C2420]' : 'text-[#2C2420]/80'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2C2420] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Action Icons & Custom Language Dropdown */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-[#2C2420]">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-[#8C8378] hover:bg-[#D9C5B2]/20 rounded-full transition-all"
              title={t('nav.searchPlaceholder')}
            >
              <Search size={20} />
            </button>

            {/* CUSTOM MULTI-LANGUAGE DROPDOWN */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs font-bold border border-[#D9C5B2] px-2.5 py-1.5 rounded-xs bg-[#F9F7F2] hover:border-[#2C2420] hover:bg-[#D9C5B2]/20 transition-all text-[#2C2420]"
                title="Select Language"
              >
                <Globe size={14} className="text-[#8C8378]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8C8378]">{t('nav.language')}</span>
                <span className="mr-0.5">{currentLangObj.flag}</span>
                <span className="uppercase tracking-wider">{currentLangObj.code}</span>
                <ChevronDown
                  size={12}
                  className={`text-[#8C8378] transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F9F7F2] border border-[#D9C5B2] shadow-xl py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#8C8378] border-b border-[#D9C5B2]/40 mb-1">
                    {t('nav.selectLanguage')}
                  </div>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#D9C5B2]/30 transition-colors ${
                        lang === l.code ? 'font-bold text-[#2C2420] bg-[#D9C5B2]/20' : 'text-[#2C2420]/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{l.flag}</span>
                        <span>{l.nativeName}</span>
                        <span className="text-[10px] text-[#8C8378] uppercase">({l.code})</span>
                      </div>
                      {lang === l.code && <Check size={14} className="text-[#2C2420]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="p-2 hover:text-[#8C8378] hover:bg-[#D9C5B2]/20 rounded-full transition-all relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#2C2420] text-[#F9F7F2] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account Link */}
            <Link
              href={user ? (isAdmin ? '/admin' : '/account') : '/account/login'}
              className="p-2 hover:text-[#8C8378] hover:bg-[#D9C5B2]/20 rounded-full transition-all flex items-center space-x-1"
              title={user ? user.name : t('nav.account')}
            >
              <User size={20} />
              {isAdmin && (
                <span className="hidden md:inline-block text-[10px] bg-[#D9C5B2] text-[#2C2420] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-xs ml-1">
                  Admin
                </span>
              )}
            </Link>

            {/* Cart Drawer Button */}
            <button
              onClick={openCart}
              className="p-2 hover:text-[#8C8378] hover:bg-[#D9C5B2]/20 rounded-full transition-all relative flex items-center"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#2C2420] text-[#F9F7F2] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F9F7F2] p-6 animate-fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-[#D9C5B2]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-editorial text-2xl text-[#2C2420]">
              STUDIO DORI
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#2C2420] p-2 hover:bg-[#D9C5B2]/30 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl text-[#2C2420] hover:text-[#8C8378] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl text-[#2C2420] font-bold underline"
              >
                {t('nav.admin')}
              </Link>
            )}
          </nav>

          {/* Mobile Language Selector */}
          <div className="mt-auto pt-6 border-t border-[#D9C5B2]">
            <span className="text-xs uppercase tracking-widest text-[#8C8378] font-bold block mb-3">
              {t('nav.selectLanguage')}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 border flex items-center space-x-2 transition-all ${
                    lang === l.code
                      ? 'border-[#2C2420] bg-[#2C2420] text-[#F9F7F2] font-bold'
                      : 'border-[#D9C5B2] text-[#2C2420]'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
