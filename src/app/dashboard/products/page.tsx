'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Box,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Tag,
  Search,
  ExternalLink
} from 'lucide-react';
import { products as initialProducts, Product } from '@/data/products';

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 1500,
    description: '',
    category: 'Signature Cakes',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    threeDLink: '',
    stockStatus: 'In Stock' as 'In Stock' | 'Low Stock' | 'Out of Stock',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProducts = productList.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (prod.badge && prod.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the product list?`)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showToast(`Product "${name}" deleted.`);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newProduct.description || 'Artisan bakery creation crafted with premium ingredients.',
      price: Number(newProduct.price),
      image: newProduct.image,
      badge: newProduct.badge || undefined,
      threeDLink: newProduct.threeDLink || '',
      stockStatus: newProduct.stockStatus,
      category: newProduct.category,
      salesCount: 0,
    };

    setProductList([created, ...productList]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      price: 1500,
      description: '',
      category: 'Signature Cakes',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
      threeDLink: '',
      stockStatus: 'In Stock',
    });
    showToast(`Product "${created.name}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
            Products Catalog
          </h1>
          <p className="text-sm text-[#8B7B6B] mt-1">
            Manage bakery cakes, 3D interactive preview assets, pricing, and stock status.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] transition-colors text-sm font-medium shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B5E3C]/10 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B6B]" />
          <input
            type="text"
            placeholder="Search products, categories, or badges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[#FDF8F3] border border-[#8B5E3C]/15 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 text-[#2D1810] placeholder-[#8B7B6B]"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-[#8B7B6B] w-full sm:w-auto justify-end">
          <span className="bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#8B5E3C]/10">
            Total Items: <strong className="text-[#2D1810]">{productList.length}</strong>
          </span>
          <span className="bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#8B5E3C]/10 flex items-center gap-1">
            <Box className="w-3.5 h-3.5 text-emerald-600" />
            3D Assets:{' '}
            <strong className="text-[#2D1810]">
              {productList.filter((p) => Boolean(p.threeDLink)).length} Connected
            </strong>
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const has3D = Boolean(product.threeDLink && product.threeDLink.trim() !== '');

          let stockBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (product.stockStatus === 'Low Stock') {
            stockBadge = 'bg-amber-50 text-amber-700 border-amber-200';
          } else if (product.stockStatus === 'Out of Stock') {
            stockBadge = 'bg-rose-50 text-rose-700 border-rose-200';
          }

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#8B5E3C]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative h-48 w-full bg-[#FAF7F2] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1A0F08]/85 text-[#D4A574] backdrop-blur-md shadow-md border border-[#D4A574]/30 uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Stock Status Pill */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md ${stockBadge}`}
                    >
                      {product.stockStatus || 'In Stock'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg text-[#2D1810] line-clamp-1 group-hover:text-[#8B5E3C] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#8B7B6B] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xl font-bold font-serif text-[#2D1810]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    {/* 3D Link Status Indicator */}
                    <div className="flex items-center">
                      {has3D ? (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                          title={`3D Asset: ${product.threeDLink}`}
                        >
                          <Box className="w-3.5 h-3.5 text-emerald-600" />
                          3D Connected
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
                          title="No 3D Model attached"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          3D Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-5 py-3 bg-[#FAF7F2]/80 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#8B7B6B] font-mono">
                  ID: {product.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Edit mode opened for ${product.name}`)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#2D1810] border border-[#8B5E3C]/20 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors shadow-2xs"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Form Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#8B5E3C]/20 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#2D1810] mb-1">
              Add New Bakery Product
            </h3>
            <p className="text-xs text-[#8B7B6B] mb-5">
              Add a new artisan cake, pastry or tart with pricing and 3D preview link.
            </p>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hazelnut Praline Mousse Cake"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Signature Cakes">Signature Cakes</option>
                    <option value="Tarts & Pies">Tarts & Pies</option>
                    <option value="Cheesecakes">Cheesecakes</option>
                    <option value="French Pastries">French Pastries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe layers, flavours, toppings..."
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, Chef Choice"
                    value={newProduct.badge}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, badge: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                    Stock Availability
                  </label>
                  <select
                    value={newProduct.stockStatus}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stockStatus: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D1810] mb-1">
                  3D Model Asset Link (.glb / .gltf)
                </label>
                <input
                  type="text"
                  placeholder="https://models.crumblebakery.com/item.glb"
                  value={newProduct.threeDLink}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, threeDLink: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#8B5E3C]/20 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-[#8B7B6B] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#5C3A1E] font-medium shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
