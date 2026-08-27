'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ExcelDataSheet from '@/components/ExcelDataSheet';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function ExcelDataSheetPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Strict Admin check: Redirect logged out or non-admin users to login
    if (user === null) {
      // Check local storage if token exists before redirecting
      const token = typeof window !== 'undefined' ? localStorage.getItem('dori_auth_token') : null;
      if (!token) {
        router.push('/account/login');
      }
    }
  }, [user, router]);

  return (
    <div className="pt-24 pb-16 bg-[#F9F7F2] min-h-screen px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 border border-[#D9C5B2] shadow-xs rounded-xs">
          <div className="flex items-center space-x-3">
            <Link
              href="/account/login"
              className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#2C2420] hover:text-[#8C8378] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Login / Admin</span>
            </Link>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[#8C8378] tracking-widest block">
              Admin Data Portal
            </span>
            <p className="font-editorial text-xl text-[#2C2420] font-bold">
              MOQ Clicks & Visitor Log Excel Sheet
            </p>
          </div>
        </div>

        {/* Dedicated Excel Data Sheet */}
        <ExcelDataSheet isFullPage={true} />
      </div>
    </div>
  );
}
