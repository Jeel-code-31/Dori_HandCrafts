'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { User, Lock, Mail, Phone, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await register(name, email, password, phone);
        if (res.success) {
          router.push('/account');
        } else {
          setErrorMsg(res.message || 'Registration failed');
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          router.push('/account');
        } else {
          setErrorMsg(res.message || 'Invalid email or password');
        }
      }
    } catch (e) {
      setErrorMsg('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#F9F7F2] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#F9F7F2] border border-[#D9C5B2] shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="font-editorial text-3xl text-[#2C2420] block">
            STUDIO DORI
          </span>
          <p className="text-xs uppercase tracking-widest text-[#8C8378]">
            {isRegister ? 'Create Artisan Account' : 'Welcome Back'}
          </p>
        </div>

        {/* Demo Admin & Customer Credentials hint */}
        <div className="p-3 bg-[#D9C5B2]/20 border border-[#D9C5B2] text-[11px] text-[#2C2420] space-y-1">
          <p className="font-bold">Demo Quick Logins:</p>
          <div className="flex justify-between">
            <span>Admin: admin@studio-dori.com</span>
            <button
              onClick={() => {
                setEmail('admin@studio-dori.com');
                setPassword('admin123');
              }}
              className="underline text-[#8C8378] hover:text-[#2C2420]"
            >
              Autofill
            </button>
          </div>
          <div className="flex justify-between">
            <span>Customer: customer@example.com</span>
            <button
              onClick={() => {
                setEmail('customer@example.com');
                setPassword('user123');
              }}
              className="underline text-[#8C8378] hover:text-[#2C2420]"
            >
              Autofill
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-[#2C2420] mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-[#8C8378]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-9 pr-3 py-2.5 text-xs text-[#2C2420] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#2C2420] mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-[#8C8378]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-9 pr-3 py-2.5 text-xs text-[#2C2420] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2C2420] mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-[#8C8378]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-9 pr-3 py-2.5 text-xs text-[#2C2420] focus:outline-hidden"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-[#2C2420] mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-[#8C8378]" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-[#F9F7F2] border border-[#D9C5B2] pl-9 pr-3 py-2.5 text-xs text-[#2C2420] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-animate text-xs font-bold uppercase tracking-widest py-3.5 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{isRegister ? 'Register Account' : t('nav.login')}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#D9C5B2]">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setErrorMsg('');
            }}
            className="text-xs text-[#8C8378] hover:text-[#2C2420] font-medium"
          >
            {isRegister
              ? 'Already have an account? Sign In'
              : "Don't have an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
}
