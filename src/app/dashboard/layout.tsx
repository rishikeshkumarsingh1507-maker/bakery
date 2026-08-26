import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export const metadata = {
  title: 'Bakery - Admin Dashboard',
  description: 'Management dashboard for Bakery orders, products, customers and analytics.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF8F3] text-[#2D1810] flex font-sans antialiased">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-[250px] min-h-screen transition-all duration-300">
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
