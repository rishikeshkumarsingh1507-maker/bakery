'use client';

import React, { useState } from 'react';
import {
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  BellRing
} from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    bakeryName: 'Bakery',
    phone: '+91 98765 43210',
    email: 'admin@crumblebakery.com',
    address: '123 Gourmet Avenue, Bandra West, Mumbai, Maharashtra 400050',
    hours: 'Mon - Sun: 8:00 AM - 10:00 PM',
    deliveryRadius: '15 km',
    currency: 'INR (₹)',
    autoAcceptOrders: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Bakery store settings saved successfully!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A0F08] text-[#F5E6D3] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#D4A574]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-2 border-b border-[#8B5E3C]/10">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1810]">
          Bakery Settings
        </h1>
        <p className="text-sm text-[#8B7B6B] mt-1">
          Configure general store information, business hours, and operational preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Store Details */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B5E3C]/10 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#8B5E3C]">
            <Store className="w-5 h-5 text-[#D4A574]" />
            <h2 className="font-serif font-bold text-lg text-[#2D1810]">
              Store Profile Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#8B7B6B]" />
                Bakery Name
              </label>
              <input
                type="text"
                required
                value={formData.bakeryName}
                onChange={(e) =>
                  setFormData({ ...formData, bakeryName: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#8B7B6B]" />
                Store Contact Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8B7B6B]" />
                Store Phone Number
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8B7B6B]" />
                Operating Hours
              </label>
              <input
                type="text"
                required
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D1810] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8B7B6B]" />
              Physical Address
            </label>
            <textarea
              rows={2}
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
            />
          </div>
        </div>

        {/* Operational Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B5E3C]/10 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#8B5E3C]">
            <ShieldCheck className="w-5 h-5 text-[#D4A574]" />
            <h2 className="font-serif font-bold text-lg text-[#2D1810]">
              Operational Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5">
                Default Currency
              </label>
              <input
                type="text"
                disabled
                value={formData.currency}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D1810] mb-1.5">
                Local Delivery Radius
              </label>
              <input
                type="text"
                value={formData.deliveryRadius}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryRadius: e.target.value })
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-medium text-sm text-[#2D1810]">
                Auto-accept online cake orders
              </span>
              <p className="text-xs text-[#8B7B6B]">
                Automatically mark incoming website orders as 'Pending'
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.autoAcceptOrders}
              onChange={(e) =>
                setFormData({ ...formData, autoAcceptOrders: e.target.checked })
              }
              className="w-5 h-5 accent-[#8B5E3C] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] transition-colors text-sm font-semibold shadow-md"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
