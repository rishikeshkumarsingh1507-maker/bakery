'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  totalAmount: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2026-894',
    customer: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 12345',
    product: 'Belgian Dark Chocolate Truffle Cake',
    quantity: 1,
    totalAmount: 1850,
    date: '2026-08-06',
    status: 'Completed',
  },
  {
    id: 'ORD-2026-893',
    customer: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    phone: '+91 98200 54321',
    product: 'Red Velvet Berry Bliss Cake',
    quantity: 1,
    totalAmount: 1650,
    date: '2026-08-06',
    status: 'Pending',
  },
  {
    id: 'ORD-2026-892',
    customer: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '+91 99300 11223',
    product: 'Wild Blueberry Cheesecake',
    quantity: 1,
    totalAmount: 1950,
    date: '2026-08-06',
    status: 'Processing',
  },
  {
    id: 'ORD-2026-891',
    customer: 'Vikramaditya Roy',
    email: 'vroy@example.com',
    phone: '+91 98199 88776',
    product: 'Salted Caramel Pecan Tart',
    quantity: 2,
    totalAmount: 2400,
    date: '2026-08-05',
    status: 'Cancelled',
  },
  {
    id: 'ORD-2026-890',
    customer: 'Sneha Kulkarni',
    email: 'sneha.k@example.com',
    phone: '+91 97690 33445',
    product: 'Pistachio Raspberry Opera Cake',
    quantity: 1,
    totalAmount: 2200,
    date: '2026-08-05',
    status: 'Pending',
  },
  {
    id: 'ORD-2026-889',
    customer: 'Arjun Verma',
    email: 'arjun.v@example.com',
    phone: '+91 98211 66778',
    product: 'Alphonso Mango Passion Fruit Gateau',
    quantity: 1,
    totalAmount: 2100,
    date: '2026-08-05',
    status: 'Completed',
  },
  {
    id: 'ORD-2026-888',
    customer: 'Kavita Joshi',
    email: 'kavita.j@example.com',
    phone: '+91 99870 55443',
    product: 'Belgian Dark Chocolate Truffle Cake',
    quantity: 2,
    totalAmount: 3700,
    date: '2026-08-04',
    status: 'Completed',
  },
  {
    id: 'ORD-2026-887',
    customer: 'Devendra Patel',
    email: 'dev.patel@example.com',
    phone: '+91 98333 44556',
    product: 'Red Velvet Berry Bliss Cake',
    quantity: 1,
    totalAmount: 1650,
    date: '2026-08-04',
    status: 'Processing',
  },
  {
    id: 'ORD-2026-886',
    customer: 'Meera Deshmukh',
    email: 'meera.d@example.com',
    phone: '+91 99200 99887',
    product: 'Wild Blueberry Cheesecake',
    quantity: 1,
    totalAmount: 1950,
    date: '2026-08-03',
    status: 'Completed',
  },
  {
    id: 'ORD-2026-885',
    customer: 'Siddharth Sen',
    email: 'sid.sen@example.com',
    phone: '+91 98700 33221',
    product: 'Salted Caramel Pecan Tart',
    quantity: 3,
    totalAmount: 3600,
    date: '2026-08-03',
    status: 'Completed',
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // New order modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    email: '',
    phone: '',
    product: 'Belgian Dark Chocolate Truffle Cake',
    quantity: 1,
    amount: 1850,
  });

  // Action toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete order ${id}?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      showToast(`Order ${id} deleted successfully.`);
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Order = {
      id: `ORD-2026-${Math.floor(895 + Math.random() * 100)}`,
      customer: newOrder.customer || 'Walk-in Customer',
      email: newOrder.email || 'customer@crumble.com',
      phone: newOrder.phone || '+91 98000 00000',
      product: newOrder.product,
      quantity: Number(newOrder.quantity),
      totalAmount: Number(newOrder.amount) * Number(newOrder.quantity),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setOrders([created, ...orders]);
    setIsModalOpen(false);
    setNewOrder({
      customer: '',
      email: '',
      phone: '',
      product: 'Belgian Dark Chocolate Truffle Cake',
      quantity: 1,
      amount: 1850,
    });
    showToast(`Order ${created.id} created successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A0F08] text-[#F5E6D3] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#D4A574]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#8B5E3C]/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1810]">
            Orders Management
          </h1>
          <p className="text-sm text-[#8B7B6B] mt-1">
            Track, filter, and process all customer bakery orders.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] transition-colors text-sm font-medium shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B5E3C]/10 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B6B]" />
          <input
            type="text"
            placeholder="Search by ID, customer, or product..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810] placeholder-[#8B7B6B]"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#8B7B6B] hidden sm:inline" />
          <span className="text-xs font-medium text-[#8B7B6B] hidden sm:inline">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto px-3.5 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810] font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#8B5E3C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#2D1810]">
            <thead className="bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-[#8B7B6B]">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#8B7B6B]">
                    No orders match your search or filter.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  let badgeStyle = '';
                  if (order.status === 'Completed') {
                    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  } else if (order.status === 'Pending') {
                    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
                  } else if (order.status === 'Processing') {
                    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
                  } else {
                    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
                  }

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[#FDF8F3]/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-medium text-xs text-[#8B5E3C]">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#2D1810]">
                          {order.customer}
                        </div>
                        <div className="text-xs text-[#8B7B6B]">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#2D1810]">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#2D1810]">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#8B7B6B]">
                        {order.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badgeStyle}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              order.status === 'Completed'
                                ? 'bg-emerald-500'
                                : order.status === 'Pending'
                                ? 'bg-amber-500'
                                : order.status === 'Processing'
                                ? 'bg-blue-500'
                                : 'bg-rose-500'
                            }`}
                          />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              showToast(`Viewing details for ${order.id}`)
                            }
                            className="p-1.5 rounded-lg text-[#8B7B6B] hover:text-[#8B5E3C] hover:bg-[#FAF7F2] transition-colors"
                            title="View Order"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              showToast(`Edit mode for ${order.id}`)
                            }
                            className="p-1.5 rounded-lg text-[#8B7B6B] hover:text-blue-600 hover:bg-[#FAF7F2] transition-colors"
                            title="Edit Order"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-lg text-[#8B7B6B] hover:text-rose-600 hover:bg-[#FAF7F2] transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 bg-[#FAF7F2] border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B7B6B]">
          <div>
            Showing{' '}
            <span className="font-semibold text-[#2D1810]">
              {filteredOrders.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-[#2D1810]">
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-[#2D1810]">
              {filteredOrders.length}
            </span>{' '}
            orders
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#8B5E3C]/15 bg-white text-[#2D1810] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FDF8F3] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-[#2D1810] px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-[#8B5E3C]/15 bg-white text-[#2D1810] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FDF8F3] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#8B5E3C]/20 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#2D1810] mb-1">
              Create New Bakery Order
            </h3>
            <p className="text-xs text-[#8B7B6B] mb-5">
              Enter details for counter or phone order.
            </p>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Roy"
                  value={newOrder.customer}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customer: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="radhika@example.com"
                  value={newOrder.email}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Bakery Item
                </label>
                <select
                  value={newOrder.product}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, product: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                >
                  <option value="Belgian Dark Chocolate Truffle Cake">
                    Belgian Dark Chocolate Truffle Cake (₹1,850)
                  </option>
                  <option value="Red Velvet Berry Bliss Cake">
                    Red Velvet Berry Bliss Cake (₹1,650)
                  </option>
                  <option value="Salted Caramel Pecan Tart">
                    Salted Caramel Pecan Tart (₹1,200)
                  </option>
                  <option value="Wild Blueberry Cheesecake">
                    Wild Blueberry Cheesecake (₹1,950)
                  </option>
                  <option value="Pistachio Raspberry Opera Cake">
                    Pistachio Raspberry Opera Cake (₹2,200)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.quantity}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Unit Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newOrder.amount}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        amount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-[#8B7B6B] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] font-medium shadow-sm"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
