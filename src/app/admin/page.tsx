'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Package, ShoppingBag, DollarSign, AlertTriangle, Plus, Edit, Trash2, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Product Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    SKU: '',
    stock: '10',
    material: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/account/login');
      return;
    }

    async function loadAdminData() {
      setLoading(true);
      try {
        const [prodRes, ordRes, catRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/categories'),
        ]);

        const prodData = await prodRes.json();
        const ordData = await ordRes.json();
        const catData = await catRes.json();

        setProducts(Array.isArray(prodData) ? prodData : []);
        setOrders(Array.isArray(ordData) ? ordData : []);
        setCategories(Array.isArray(catData) ? catData : []);
        if (catData.length > 0) setNewProd((p) => ({ ...p, categoryId: catData[0].id }));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') return null;

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProds = products.filter((p) => p.stock <= 5);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProd,
          images: [newProd.imageUrl || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36'],
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setProducts([created, ...products]);
        setShowAddModal(false);
        setNewProd({
          name: '',
          description: '',
          shortDescription: '',
          price: '',
          compareAtPrice: '',
          categoryId: categories[0]?.id || '',
          SKU: '',
          stock: '10',
          material: '',
          imageUrl: '',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#2C2420] text-[#F9F7F2] p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D9C5B2] block mb-1">
              ADMIN CONTROL CENTER
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl">
              {t('admin.portalTitle')}
            </h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#D9C5B2] text-[#2C2420] text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#F9F7F2] flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>{t('admin.addProduct')}</span>
          </button>
        </div>

        {/* Dashboard Tabs Header */}
        <div className="flex border-b border-[#D9C5B2] mb-8 space-x-6 text-xs font-bold uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'overview' ? 'border-[#2C2420] text-[#2C2420]' : 'border-transparent text-[#8C8378]'
            }`}
          >
            Metrics Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'products' ? 'border-[#2C2420] text-[#2C2420]' : 'border-transparent text-[#8C8378]'
            }`}
          >
            {t('admin.navProducts')} ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'orders' ? 'border-[#2C2420] text-[#2C2420]' : 'border-transparent text-[#8C8378]'
            }`}
          >
            {t('admin.navOrders')} ({orders.length})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#F9F7F2] border border-[#D9C5B2] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#8C8378]">{t('admin.totalSales')}</span>
                <div className="font-editorial text-3xl font-bold text-[#2C2420]">
                  ₹{totalSales.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-6 bg-[#F9F7F2] border border-[#D9C5B2] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#8C8378]">{t('admin.totalOrders')}</span>
                <div className="font-editorial text-3xl font-bold text-[#2C2420]">
                  {orders.length}
                </div>
              </div>

              <div className="p-6 bg-[#F9F7F2] border border-[#D9C5B2] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#8C8378]">{t('admin.totalProducts')}</span>
                <div className="font-editorial text-3xl font-bold text-[#2C2420]">
                  {products.length}
                </div>
              </div>

              <div className="p-6 bg-[#F9F7F2] border border-[#D9C5B2] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#8C8378]">{t('admin.lowStockAlerts')}</span>
                <div className="font-editorial text-3xl font-bold text-amber-700">
                  {lowStockProds.length}
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-[#F9F7F2] border border-[#D9C5B2] p-6 space-y-4">
              <h3 className="font-editorial text-2xl text-[#2C2420]">Recent Customer Orders</h3>
              <div className="divide-y divide-[#D9C5B2]/40">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#2C2420]">#{o.orderNumber}</span>
                      <span className="text-[#8C8378] block">{o.customerName} ({o.customerEmail})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#2C2420]">₹{o.total.toLocaleString('en-IN')}</span>
                      <span className="block text-[10px] uppercase font-bold text-green-700">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products CRUD Tab */}
        {activeTab === 'products' && (
          <div className="bg-[#F9F7F2] border border-[#D9C5B2] p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-2xl text-[#2C2420]">Active Product Inventory</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-wider px-4 py-2"
              >
                + Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#2C2420]">
                <thead className="bg-[#D9C5B2]/30 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9C5B2]/40">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#D9C5B2]/10">
                      <td className="p-3 font-bold font-editorial text-sm">{p.name}</td>
                      <td className="p-3 text-[#8C8378]">{p.SKU}</td>
                      <td className="p-3">{p.category?.name}</td>
                      <td className="p-3 font-medium">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold ${p.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-red-700 hover:text-red-900 font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management Tab */}
        {activeTab === 'orders' && (
          <div className="bg-[#F9F7F2] border border-[#D9C5B2] p-6 space-y-6">
            <h3 className="font-editorial text-2xl text-[#2C2420]">Order Management</h3>
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="p-4 border border-[#D9C5B2] space-y-3">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-sm text-[#2C2420]">Order #{o.orderNumber}</span>
                      <p className="text-[#8C8378]">{o.customerName} | {o.phone} | {o.customerEmail}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-[10px] uppercase font-bold text-[#8C8378]">Status:</label>
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-[#F9F7F2] border border-[#D9C5B2] text-xs p-1 font-bold focus:outline-hidden"
                      >
                        {['Pending', 'Paid', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-[#2C2420] border-t border-[#D9C5B2]/40 pt-2">
                    <p><strong>Total Amount:</strong> ₹{o.total.toLocaleString('en-IN')}</p>
                    <p className="text-[#8C8378]">Items: {o.items?.map((i: any) => `${i.name} (x${i.quantity})`).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-[#2C2420]/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#F9F7F2] max-w-xl w-full border border-[#D9C5B2] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="font-editorial text-2xl text-[#2C2420]">Create New Handcrafted Product</h3>
              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">Category</label>
                    <select
                      value={newProd.categoryId}
                      onChange={(e) => setNewProd({ ...newProd, categoryId: e.target.value })}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">SKU Code</label>
                    <input
                      type="text"
                      required
                      placeholder="WH-NEW-01"
                      value={newProd.SKU}
                      onChange={(e) => setNewProd({ ...newProd, SKU: e.target.value })}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">Initial Stock</label>
                    <input
                      type="number"
                      required
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    value={newProd.shortDescription}
                    onChange={(e) => setNewProd({ ...newProd, shortDescription: e.target.value })}
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Primary Image URL (Unsplash)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newProd.imageUrl}
                    onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-2"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 border border-[#2C2420] py-2 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#2C2420] text-[#F9F7F2] py-2 font-bold"
                  >
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
