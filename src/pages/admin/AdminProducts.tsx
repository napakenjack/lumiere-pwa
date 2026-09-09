import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useShopStore } from '../../store/useShopStore';
import { formatPrice } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { Product } from '../../types';

export function AdminProducts() {
  const { products, deleteProduct } = useShopStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление товарами</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" /> Добавить товар
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Товар</th>
                <th className="px-6 py-4 font-medium text-gray-500">Бренд / Категория</th>
                <th className="px-6 py-4 font-medium text-gray-500">Цена</th>
                <th className="px-6 py-4 font-medium text-gray-500">Остаток</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Действия</th>
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
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{product.brand}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{formatPrice(product.price)}</div>
                    {product.oldPrice && <div className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0 ? 'bg-red-50 text-red-700' :
                      product.stock < 10 ? 'bg-orange-50 text-orange-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {product.stock} шт.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
