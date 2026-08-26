'use client';

import React, { useState } from 'react';
import {
  Search,
  User,
  Mail,
  Phone,
  ShoppingBag,
  IndianRupee,
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  UserCheck,
  UserX
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
  avatarBg: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-101',
    name: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 98765 12345',
    totalOrders: 14,
    totalSpent: 24800,
    lastOrderDate: '2026-08-06',
    status: 'Active',
    avatarBg: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'CUST-102',
    name: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    phone: '+91 98200 54321',
    totalOrders: 9,
    totalSpent: 16400,
    lastOrderDate: '2026-08-06',
    status: 'Active',
    avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'CUST-103',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '+91 99300 11223',
    totalOrders: 18,
    totalSpent: 35200,
    lastOrderDate: '2026-08-06',
    status: 'Active',
    avatarBg: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    id: 'CUST-104',
    name: 'Vikramaditya Roy',
    email: 'vroy@example.com',
    phone: '+91 98199 88776',
    totalOrders: 4,
    totalSpent: 7200,
    lastOrderDate: '2026-08-05',
    status: 'Inactive',
    avatarBg: 'bg-gray-100 text-gray-700 border-gray-300',
  },
  {
    id: 'CUST-105',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@example.com',
    phone: '+91 97690 33445',
    totalOrders: 11,
    totalSpent: 21500,
    lastOrderDate: '2026-08-05',
    status: 'Active',
    avatarBg: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    id: 'CUST-106',
    name: 'Arjun Verma',
    email: 'arjun.v@example.com',
    phone: '+91 98211 66778',
    totalOrders: 7,
    totalSpent: 12900,
    lastOrderDate: '2026-08-05',
    status: 'Active',
    avatarBg: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 'CUST-107',
    name: 'Kavita Joshi',
    email: 'kavita.j@example.com',
    phone: '+91 99870 55443',
    totalOrders: 22,
    totalSpent: 42600,
    lastOrderDate: '2026-08-04',
    status: 'Active',
    avatarBg: 'bg-[#FDF8F3] text-[#8B5E3C] border-[#D4A574]',
  },
  {
    id: 'CUST-108',
    name: 'Devendra Patel',
    email: 'dev.patel@example.com',
    phone: '+91 98333 44556',
    totalOrders: 2,
    totalSpent: 3300,
    lastOrderDate: '2026-07-28',
    status: 'Inactive',
    avatarBg: 'bg-slate-100 text-slate-700 border-slate-300',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#8B5E3C]/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1810]">
            Customer Management
          </h1>
          <p className="text-sm text-[#8B7B6B] mt-1">
            View loyalty history, order metrics, and contact details for Bakery clients.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="bg-white px-4 py-2 rounded-xl border border-[#8B5E3C]/10 shadow-2xs text-[#8B7B6B]">
            Active Clients:{' '}
            <strong className="text-emerald-700 font-bold ml-1">
              {customers.filter((c) => c.status === 'Active').length}
            </strong>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B5E3C]/10 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B6B]" />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810] placeholder-[#8B7B6B]"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-[#8B5E3C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2D1810]">
            <thead className="bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-[#8B7B6B]">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-center">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#8B7B6B]">
                    No customers found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const initialLetter = cust.name.charAt(0).toUpperCase();

                  return (
                    <tr
                      key={cust.id}
                      className="hover:bg-[#FDF8F3]/60 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif text-sm border shadow-xs shrink-0 ${cust.avatarBg}`}
                          >
                            {initialLetter}
                          </div>
                          <div>
                            <div className="font-semibold text-[#2D1810]">
                              {cust.name}
                            </div>
                            <div className="text-[11px] font-mono text-[#8B7B6B]">
                              {cust.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="text-xs text-[#2D1810] flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#8B7B6B]" />
                          {cust.email}
                        </div>
                        <div className="text-xs text-[#8B7B6B] flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-[#8B7B6B]" />
                          {cust.phone}
                        </div>
                      </td>

                      {/* Total Orders */}
                      <td className="px-6 py-4 text-center font-bold text-[#8B5E3C]">
                        {cust.totalOrders}
                      </td>

                      {/* Total Spent */}
                      <td className="px-6 py-4 font-bold text-[#2D1810]">
                        ₹{cust.totalSpent.toLocaleString('en-IN')}
                      </td>

                      {/* Last Order Date */}
                      <td className="px-6 py-4 text-xs text-[#8B7B6B]">
                        {cust.lastOrderDate}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                            cust.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {cust.status === 'Active' ? (
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <UserX className="w-3.5 h-3.5 text-gray-500" />
                          )}
                          {cust.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-[#FAF7F2] border-t border-gray-100 text-xs text-[#8B7B6B] flex items-center justify-between">
          <span>
            Showing <strong className="text-[#2D1810]">{filteredCustomers.length}</strong> customers
          </span>
          <span>
            Combined Customer Revenue:{' '}
            <strong className="text-[#8B5E3C]">
              ₹
              {filteredCustomers
                .reduce((acc, curr) => acc + curr.totalSpent, 0)
                .toLocaleString('en-IN')}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
