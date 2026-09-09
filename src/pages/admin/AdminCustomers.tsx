import React from 'react';
import { useShopStore } from '../../store/useShopStore';

export function AdminCustomers() {
  const { users, orders } = useShopStore();

  const customers = users.filter(u => u.role === 'user').map(user => {
    const userOrders = orders.filter(o => o.userId === user.id);
    const totalSpent = userOrders.reduce((sum, o) => sum + o.finalAmount, 0);
    return { ...user, ordersCount: userOrders.length, totalSpent };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Клиенты</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Имя</th>
                <th className="px-6 py-4 font-medium text-gray-500">Email / Телефон</th>
                <th className="px-6 py-4 font-medium text-gray-500">Заказов</th>
                <th className="px-6 py-4 font-medium text-gray-500">Сумма покупок</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{customer.email}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {customer.ordersCount}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {customer.totalSpent.toLocaleString('ru-RU')} ₸
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
