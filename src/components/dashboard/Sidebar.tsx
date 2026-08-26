'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Cake,
  Users,
  Settings,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const navItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingBag,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: Cake,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-16 md:w-[250px] bg-[#1A0F08] text-[#F5E6D3] flex flex-col justify-between z-40 transition-all duration-300 border-r border-[#2D1A10] shadow-xl">
      <div>
        {/* Logo Section */}
        <div className="h-20 px-4 md:px-6 flex items-center border-b border-[#2D1A10]/80">
          <Link href="/dashboard" className="flex items-center gap-3 group w-full overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#8B5E3C] flex items-center justify-center text-[#1A0F08] font-bold shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Cake className="w-5 h-5 text-[#1A0F08]" />
            </div>
            <div className="hidden md:flex flex-col min-w-0">
              <span className="font-serif text-lg font-bold tracking-wide text-[#F5E6D3] group-hover:text-[#D4A574] transition-colors truncate">
                Bakery Admin
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8B7B6B] font-sans flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#D4A574]" /> Artisan Bakery
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 md:p-4 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check exact active match for /dashboard, or startsWith for subroutes
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-[#2D1A10] text-[#D4A574] font-semibold shadow-inner'
                    : 'text-[#8B7B6B] hover:bg-[#25160D] hover:text-[#F5E6D3]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#D4A574] rounded-r-full" />
                )}
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-[#D4A574]' : 'text-[#8B7B6B] group-hover:text-[#F5E6D3]'
                  }`}
                />
                <span className="hidden md:inline text-sm tracking-wide font-sans truncate">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Back to Website Link */}
      <div className="p-3 md:p-4 border-t border-[#2D1A10]/80">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-[#8B7B6B] hover:bg-[#25160D] hover:text-[#D4A574] transition-all duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:inline text-sm font-medium tracking-wide truncate">
            Back to Website
          </span>
        </Link>
      </div>
    </aside>
  );
}
