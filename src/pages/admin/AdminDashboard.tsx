import React from 'react';
import { useShopStore } from '../../store/useShopStore';
import { formatPrice } from '../../lib/utils';
import { ShoppingBag, Users, DollarSign, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1 Сен', total: 120000 },
  { name: '2 Сен', total: 150000 },
  { name: '3 Сен', total: 80000 },
  { name: '4 Сен', total: 220000 },
  { name: '5 Сен', total: 190000 },
  { name: '6 Сен', total: 280000 },
  { name: '7 Сен', total: 310000 },
];

export function AdminDashboard() {
  const { products, orders, users } = useShopStore();

  const totalSales = orders.reduce((acc, order) => acc + order.finalAmount, 0);
  const averageCheck = orders.length > 0 ? totalSales / orders.length : 0;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Общие продажи</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(totalSales)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Заказы</h3>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Клиенты</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Средний чек</h3>
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(averageCheck)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">График продаж (Сентябрь)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip cursor={{stroke: '#d1d5db', strokeWidth: 1}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="total" stroke="#111827" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Заканчиваются</h3>
          <div className="flex-1 overflow-auto space-y-4">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-gray-500">Все товары в достаточном количестве.</p>
            ) : (
              lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-orange-500 font-medium">Осталось: {p.stock} шт.</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
