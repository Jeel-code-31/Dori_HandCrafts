'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginSection from '@/components/LoginSection';
import ExcelDataSheet from '@/components/ExcelDataSheet';
import { LogOut, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { user, logout } = useAuth();

  return (
    <div className="pt-24 pb-12 bg-[#F9F7F2] min-h-[92vh] flex flex-col justify-center px-3 sm:px-6 lg:px-8 w-full">
      {user ? (
        <div className="w-full max-w-[96vw] mx-auto space-y-4 animate-fadeIn">
          {/* Admin Logged-In Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 border border-[#D9C5B2] shadow-sm rounded-xs">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#107C41] text-white flex items-center justify-center font-bold text-base shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-[#107C41] text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-xs">
                    ADMIN MASTER ACCESS
                  </span>
                  <p className="text-base font-bold text-[#2C2420]">{user.name || 'Admin Master'}</p>
                </div>
                <p className="text-xs text-[#8C8378] mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs text-[#107C41] font-bold bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-xs">
                ✓ Live Excel MOQ Spreadsheet
              </span>
              <button
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
                className="flex items-center space-x-2 text-xs text-red-700 hover:text-red-900 font-bold px-4 py-2 border border-red-200 rounded-xs bg-red-50 hover:bg-red-100 transition-colors shadow-2xs"
                title="Log Out Admin Session"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Full Excel Data Sheet View Directly Rendered */}
          <ExcelDataSheet isFullPage={true} />
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto py-8">
          <LoginSection />
        </div>
      )}
    </div>
  );
}
