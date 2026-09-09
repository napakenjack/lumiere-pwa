import React, { useState } from 'react';
import { useShopStore } from '../../store/useShopStore';
import { Product } from '../../types';

export function AdminInventory() {
  const { products, updateProduct } = useShopStore();

  const handleStockChange = (product: Product, newStock: number) => {
    updateProduct({ ...product, stock: Math.max(0, newStock) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Остатки на складе</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Товар</th>
                <th className="px-6 py-4 font-medium text-gray-500">SKU / ID</th>
                <th className="px-6 py-4 font-medium text-gray-500">Статус</th>
                <th className="px-6 py-4 font-medium text-gray-500">Изменить остаток</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {product.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0 ? 'bg-red-50 text-red-700' :
                      product.stock < 10 ? 'bg-orange-50 text-orange-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {product.stock === 0 ? 'Закончился' : product.stock < 10 ? 'Мало' : 'В наличии'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) => handleStockChange(product, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-center focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                    />
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
