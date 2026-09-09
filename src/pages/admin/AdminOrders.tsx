import React from 'react';
import { useShopStore } from '../../store/useShopStore';
import { formatPrice } from '../../lib/utils';
import { OrderStatus } from '../../types';

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Новый': 'bg-blue-50 text-blue-700',
  'Оплачен': 'bg-indigo-50 text-indigo-700',
  'Обрабатывается': 'bg-yellow-50 text-yellow-700',
  'Отправлен': 'bg-purple-50 text-purple-700',
  'Доставлен': 'bg-green-50 text-green-700',
  'Отменен': 'bg-red-50 text-red-700',
};

const STATUS_OPTIONS: OrderStatus[] = ['Новый', 'Оплачен', 'Обрабатывается', 'Отправлен', 'Доставлен', 'Отменен'];

export function AdminOrders() {
  const { orders, updateOrderStatus } = useShopStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление заказами</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Заказ</th>
                <th className="px-6 py-4 font-medium text-gray-500">Клиент</th>
                <th className="px-6 py-4 font-medium text-gray-500">Дата</th>
                <th className="px-6 py-4 font-medium text-gray-500">Сумма</th>
                <th className="px-6 py-4 font-medium text-gray-500">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Нет заказов
                  </td>
                </tr>
              )}
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{order.customerInfo.firstName} {order.customerInfo.lastName}</div>
                    <div className="text-xs text-gray-500">{order.customerInfo.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatPrice(order.finalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold rounded-full px-3 py-1.5 border-r-8 border-transparent outline-none cursor-pointer appearance-none ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-white text-gray-900">{opt}</option>
                      ))}
                    </select>
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
