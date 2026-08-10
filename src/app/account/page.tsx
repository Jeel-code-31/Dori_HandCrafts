'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { User, Package, Heart, MapPin, LogOut, Settings } from 'lucide-react';

export default function CustomerAccountPage() {
  const { user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/account/login');
      return;
    }

    async function fetchOrders() {
      if (!user) return;
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="bg-[#2C2420] text-[#F9F7F2] p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D9C5B2] block mb-1">
              CUSTOMER DASHBOARD
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl">
              {t('account.welcome', { name: user.name })}
            </h1>
            <p className="text-xs text-[#D9C5B2] mt-1">{user.email}</p>
          </div>

          <div className="flex space-x-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-[#D9C5B2] text-[#2C2420] text-xs font-bold uppercase tracking-wider px-4 py-2.5 hover:bg-[#F9F7F2]"
              >
                Go to Admin Portal
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="border border-[#D9C5B2] text-[#F9F7F2] text-xs font-bold uppercase tracking-wider px-4 py-2.5 hover:bg-[#F9F7F2] hover:text-[#2C2420] flex items-center space-x-1"
            >
              <LogOut size={14} />
              <span>{t('account.logout')}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (3 Columns) */}
          <aside className="lg:col-span-3 bg-[#F9F7F2] border border-[#D9C5B2] p-4 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors ${
                activeTab === 'orders' ? 'bg-[#2C2420] text-[#F9F7F2]' : 'text-[#2C2420] hover:bg-[#D9C5B2]/30'
              }`}
            >
              <Package size={16} />
              <span>{t('account.ordersTab')} ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left p-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors ${
                activeTab === 'profile' ? 'bg-[#2C2420] text-[#F9F7F2]' : 'text-[#2C2420] hover:bg-[#D9C5B2]/30'
              }`}
            >
              <User size={16} />
              <span>{t('account.profileTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left p-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors ${
                activeTab === 'addresses' ? 'bg-[#2C2420] text-[#F9F7F2]' : 'text-[#2C2420] hover:bg-[#D9C5B2]/30'
              }`}
            >
              <MapPin size={16} />
              <span>{t('account.addressesTab')}</span>
            </button>
          </aside>

          {/* Tab Main Area (9 Columns) */}
          <main className="lg:col-span-9 bg-[#F9F7F2] border border-[#D9C5B2] p-6 sm:p-8">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#2C2420] pb-2 border-b border-[#D9C5B2]">
                  {t('account.ordersTab')}
                </h3>

                {loadingOrders ? (
                  <p className="text-xs text-[#8C8378]">Loading order history...</p>
                ) : orders.length === 0 ? (
                  <p className="text-xs text-[#8C8378]">{t('account.noOrders')}</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o.id} className="p-4 border border-[#D9C5B2] bg-[#F9F7F2] space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pb-3 border-b border-[#D9C5B2]/40 gap-2">
                          <div>
                            <span className="font-bold text-[#2C2420]">Order #{o.orderNumber}</span>
                            <span className="text-[#8C8378] block">
                              Placed on {new Date(o.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="bg-[#2C2420] text-[#F9F7F2] text-[10px] font-bold uppercase px-2 py-0.5">
                              {o.status}
                            </span>
                            <span className="font-editorial text-lg font-bold text-[#2C2420]">
                              ₹{o.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          {o.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-[#8C8378]">
                              <span>{item.name} x {item.quantity}</span>
                              <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#2C2420] pb-2 border-b border-[#D9C5B2]">
                  {t('account.profileTab')}
                </h3>
                <div className="space-y-3 text-xs text-[#2C2420]">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#2C2420] pb-2 border-b border-[#D9C5B2]">
                  {t('account.addressesTab')}
                </h3>
                <p className="text-xs text-[#8C8378]">
                  No saved addresses yet. Addresses are automatically saved during checkout.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
