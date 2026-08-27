'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  verifyFixedCredentials,
  getClickCount,
  getUserCount,
  getClickHistory,
  ClickRecord,
} from '@/lib/login';
import ExcelDataSheet from './ExcelDataSheet';
import {
  User,
  Lock,
  ArrowRight,
  MousePointerClick,
  LogOut,
  Users,
  ShieldAlert,
} from 'lucide-react';

interface LoginSectionProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export default function LoginSection({ onSuccess, compact = false }: LoginSectionProps) {
  const { user, logout } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Live counter states
  const [clickCount, setClickCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [clickHistory, setClickHistory] = useState<ClickRecord[]>([]);

  const refreshTracker = () => {
    setClickCount(getClickCount());
    setUserCount(getUserCount());
    setClickHistory(getClickHistory());
  };

  useEffect(() => {
    refreshTracker();
    const handleUpdate = () => refreshTracker();
    window.addEventListener('dori_click_tracker_updated', handleUpdate);
    return () => window.removeEventListener('dori_click_tracker_updated', handleUpdate);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Strictly verify Admin-only credentials
      const validation = verifyFixedCredentials(emailOrUsername, password);
      if (!validation.success || !validation.user) {
        setErrorMsg(validation.message || 'Access Denied: Only Admin can log in.');
        setLoading(false);
        return;
      }

      // Send to Auth API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('dori_auth_token', data.token);
        localStorage.setItem('dori_auth_user', JSON.stringify(data.user));
        if (onSuccess) onSuccess();
        window.location.href = '/account/login';
      } else {
        setErrorMsg(data.message || 'Login failed. Admin access only.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // LOGGED-IN ADMIN STATE: Shows live counters & direct Excel sheet (NO EXTRA BUTTONS)
  if (user) {
    return (
      <div className={`space-y-5 text-[#2C2420] ${compact ? 'p-4' : 'p-8 bg-[#F9F7F2] border border-[#D9C5B2] shadow-2xl rounded-sm w-full'}`}>
        {/* Admin User Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D9C5B2]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#107C41] text-[#F9F7F2] flex items-center justify-center font-bold text-sm shadow-xs">
              A
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-bold leading-none">{user.name || 'Admin Master'}</p>
                <span className="bg-[#107C41] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-[#8C8378] mt-0.5">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              window.location.reload();
            }}
            className="flex items-center space-x-1.5 text-xs text-red-700 hover:text-red-900 font-semibold px-3 py-1.5 border border-red-200 rounded-xs bg-red-50 hover:bg-red-100 transition-colors"
            title="Log Out"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>

        {/* Live Counters Display for Website MOQ Clicks */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-[#D9C5B2]/25 border border-[#D9C5B2] rounded-xs shadow-2xs">
            <div className="flex items-center justify-center space-x-1.5 text-[#8C8378] mb-1">
              <MousePointerClick size={16} className="text-[#2C2420]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#2C2420]">MOQ Clicks</span>
            </div>
            <span className="font-editorial text-3xl font-bold text-[#2C2420]">{clickCount}</span>
          </div>

          <div className="p-4 bg-[#D9C5B2]/25 border border-[#D9C5B2] rounded-xs shadow-2xs">
            <div className="flex items-center justify-center space-x-1.5 text-[#8C8378] mb-1">
              <Users size={16} className="text-[#2C2420]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#2C2420]">User Count</span>
            </div>
            <span className="font-editorial text-3xl font-bold text-[#2C2420]">{userCount}</span>
          </div>
        </div>

        {/* Direct Excel Data Sheet Component without extra buttons */}
        <div className="pt-2">
          <ExcelDataSheet />
        </div>
      </div>
    );
  }

  // LOGGED-OUT STATE: High-quality, spacious Admin Login Form
  return (
    <div className={`space-y-6 text-[#2C2420] ${compact ? 'p-4' : 'p-8 sm:p-10 bg-white border border-[#D9C5B2] shadow-2xl rounded-sm w-full'}`}>
      <div className="text-center space-y-2">
        <span className="font-editorial text-3xl sm:text-4xl text-[#2C2420] block tracking-wide">
          ZIZZIQ
        </span>
        <p className="text-xs uppercase tracking-widest text-[#8C8378] font-bold">
          Admin Portal Sign In
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-800 text-xs rounded-xs font-semibold flex items-center space-x-2">
          <ShieldAlert size={18} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#2C2420] mb-1.5">Username or Email</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-3.5 text-[#8C8378]" />
            <input
              type="text"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter Admin Username or Email"
              className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-10 pr-4 py-3 text-xs sm:text-sm text-[#2C2420] focus:outline-hidden focus:border-[#2C2420] rounded-xs shadow-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2C2420] mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-3.5 text-[#8C8378]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-10 pr-4 py-3 text-xs sm:text-sm text-[#2C2420] focus:outline-hidden focus:border-[#2C2420] rounded-xs shadow-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2C2420] hover:bg-[#8C8378] text-[#F9F7F2] text-xs sm:text-sm font-bold uppercase tracking-widest py-3.5 transition-all duration-200 flex items-center justify-center space-x-2 rounded-xs shadow-md cursor-pointer mt-2"
        >
          <span>{loading ? 'Verifying Credentials...' : 'Admin Sign In'}</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
