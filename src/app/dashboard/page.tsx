'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  Users,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';

const stats = [
  {
    title: 'Total Orders',
    value: '1,247',
    change: '+12.5% vs last month',
    isPositive: true,
    icon: ShoppingBag,
    iconBg: 'bg-amber-100 text-[#8B5E3C]',
    borderColor: 'border-amber-200/60',
  },
  {
    title: 'Total Revenue',
    value: '₹2,84,500',
    change: '+18.2% vs last month',
    isPositive: true,
    icon: IndianRupee,
    iconBg: 'bg-emerald-100 text-emerald-800',
    borderColor: 'border-emerald-200/60',
  },
  {
    title: 'Active Orders',
    value: '18',
    change: '5 preparing, 13 out for delivery',
    isPositive: true,
    icon: Clock,
    iconBg: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-200/60',
  },
  {
    title: 'Total Customers',
    value: '856',
    change: '+24 new this week',
    isPositive: true,
    icon: Users,
    iconBg: 'bg-purple-100 text-purple-800',
    borderColor: 'border-purple-200/60',
  },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 185000, heightPercentage: 55 },
  { month: 'Feb', revenue: 210000, heightPercentage: 65 },
  { month: 'Mar', revenue: 195000, heightPercentage: 60 },
  { month: 'Apr', revenue: 240000, heightPercentage: 75 },
  { month: 'May', revenue: 225000, heightPercentage: 70 },
  { month: 'Jun', revenue: 260000, heightPercentage: 82 },
  { month: 'Jul', revenue: 275000, heightPercentage: 88 },
  { month: 'Aug', revenue: 284500, heightPercentage: 92, isCurrent: true },
];

const recentOrders = [
  {
    id: 'ORD-2026-894',
    customer: 'Ananya Sharma',
    email: 'ananya@example.com',
    cake: 'Belgian Dark Chocolate Truffle',
    amount: '₹1,850',
    status: 'Completed',
    date: 'Aug 6, 2026 11:20 AM',
  },
  {
    id: 'ORD-2026-893',
    customer: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    cake: 'Red Velvet Berry Bliss Cake',
    amount: '₹1,650',
    status: 'Pending',
    date: 'Aug 6, 2026 10:45 AM',
  },
  {
    id: 'ORD-2026-892',
    customer: 'Priya Nair',
    email: 'priya.nair@example.com',
    cake: 'Wild Blueberry Cheesecake',
    amount: '₹1,950',
    status: 'Completed',
    date: 'Aug 6, 2026 09:30 AM',
  },
  {
    id: 'ORD-2026-891',
    customer: 'Vikramaditya Roy',
    email: 'vroy@example.com',
    cake: 'Salted Caramel Pecan Tart',
    amount: '₹2,400',
    status: 'Cancelled',
    date: 'Aug 5, 2026 06:15 PM',
  },
  {
    id: 'ORD-2026-890',
    customer: 'Sneha Kulkarni',
    email: 'sneha.k@example.com',
    cake: 'Pistachio Raspberry Opera Cake',
    amount: '₹2,200',
    status: 'Pending',
    date: 'Aug 5, 2026 04:50 PM',
  },
];

const topProducts = [
  {
    name: 'Belgian Dark Chocolate Truffle Cake',
    sales: 342,
    revenue: '₹6,32,700',
    percentage: 95,
    badge: 'Bestseller',
  },
  {
    name: 'Red Velvet Berry Bliss Cake',
    sales: 289,
    revenue: '₹4,76,850',
    percentage: 80,
    badge: 'Popular',
  },
  {
    name: 'Wild Blueberry NY Cheesecake',
    sales: 210,
    revenue: '₹4,09,500',
    percentage: 65,
    badge: 'Trending',
  },
  {
    name: 'Salted Caramel Pecan Tart',
    sales: 195,
    revenue: '₹2,34,000',
    percentage: 58,
    badge: 'Chef Choice',
  },
  {
    name: 'Alphonso Mango Passion Fruit Gateau',
    sales: 178,
    revenue: '₹3,73,800',
    percentage: 50,
    badge: 'Seasonal',
  },
];

export default function OverviewPage() {
  const currentDateFormatted = 'Thursday, August 6, 2026';

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#8B5E3C]/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1810]">
              Dashboard Overview
            </h1>
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] font-medium">
              <Sparkles className="w-3 h-3 text-[#D4A574]" /> Live
            </span>
          </div>
          <p className="text-sm text-[#8B7B6B] mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4A574]" />
            {currentDateFormatted}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] transition-colors text-sm font-medium shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Manage Orders
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`bg-white p-5 rounded-2xl border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#8B7B6B]">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold font-serif text-[#2D1810]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#8B7B6B] mt-1 flex items-center gap-1">
                  <span className="text-emerald-600 font-semibold inline-flex items-center">
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Chart & Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#8B5E3C]/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#2D1810]">
                Revenue Performance
              </h2>
              <p className="text-xs text-[#8B7B6B]">
                Monthly total sales breakdown for 2026
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#8B5E3C] bg-[#FDF8F3] px-3 py-1.5 rounded-lg border border-[#8B5E3C]/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#D4A574]" />
              <span>Target: ₹3,00,000/mo</span>
            </div>
          </div>

          {/* Simple Div-based CSS Chart */}
          <div className="pt-4 pb-2">
            <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-gray-100">
              {monthlyRevenue.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#1A0F08] text-white text-[11px] py-1 px-2.5 rounded-md pointer-events-none whitespace-nowrap shadow-lg z-10">
                    {item.month}: ₹{item.revenue.toLocaleString('en-IN')}
                  </div>
                  
                  {/* Bar */}
                  <div className="w-full bg-[#FAF7F2] rounded-t-lg h-full flex items-end overflow-hidden">
                    <div
                      style={{ height: `${item.heightPercentage}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 ${
                        item.isCurrent
                          ? 'bg-gradient-to-t from-[#8B5E3C] to-[#D4A574]'
                          : 'bg-[#C49A6C]/70 group-hover:bg-[#8B5E3C]'
                      }`}
                    />
                  </div>
                  <span className={`text-xs ${item.isCurrent ? 'font-bold text-[#8B5E3C]' : 'text-[#8B7B6B]'}`}>
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#8B7B6B] pt-2 border-t border-gray-50">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#8B5E3C] to-[#D4A574]" /> Current Month (Aug)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#C49A6C]/70" /> Previous Months
            </span>
          </div>
        </div>

        {/* Top Selling Products List */}
        <div className="bg-white p-6 rounded-2xl border border-[#8B5E3C]/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-bold text-[#2D1810]">
                Top Selling Bakery Products
              </h2>
              <Link
                href="/dashboard/products"
                className="text-xs font-medium text-[#8B5E3C] hover:text-[#5C3A1E] flex items-center gap-1"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {topProducts.map((prod, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#2D1810] line-clamp-1 pr-2">
                      {prod.name}
                    </span>
                    <span className="font-semibold text-[#8B5E3C] shrink-0">
                      {prod.sales} sold
                    </span>
                  </div>

                  <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#D4A574] to-[#8B5E3C] h-full rounded-full transition-all duration-500"
                      style={{ width: `${prod.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#8B7B6B]">
                    <span>Category: {prod.badge}</span>
                    <span>Rev: {prod.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[#8B5E3C]/10 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#2D1810]">
              Recent Bakery Orders
            </h2>
            <p className="text-xs text-[#8B7B6B]">
              Latest 5 customer orders across delivery and pickup
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B5E3C] hover:text-[#5C3A1E] bg-[#FDF8F3] px-3.5 py-2 rounded-xl border border-[#8B5E3C]/10 transition-colors"
          >
            All Orders <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2D1810]">
            <thead className="bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-[#8B7B6B]">
              <tr>
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Cake / Item</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FDF8F3]/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-xs text-[#8B5E3C]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#2D1810]">{order.customer}</div>
                    <div className="text-xs text-[#8B7B6B]">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-[#2D1810]">
                    {order.cake}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#2D1810]">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                        order.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-emerald-500'
                            : order.status === 'Pending'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href="/dashboard/orders"
                      className="inline-flex items-center gap-1 text-xs text-[#8B5E3C] hover:text-[#5C3A1E] font-medium p-1.5 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
