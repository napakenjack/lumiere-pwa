import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';

export function AdminLayout() {
  const { currentUser, logout } = useShopStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Доступ запрещен</h2>
          <button onClick={() => navigate('/')} className="text-accent hover:underline">Вернуться в магазин</button>
        </div>
      </div>
    );
  }

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Товары', path: '/admin/products', icon: Package },
    { name: 'Остатки', path: '/admin/inventory', icon: Package },
    { name: 'Заказы', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Клиенты', path: '/admin/customers', icon: Users },
    { name: 'Настройки', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-serif text-xl font-bold">Lumière Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menu.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors mb-2">
            <ArrowLeft className="w-5 h-5" />
            <span>В магазин</span>
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            {menu.find(m => m.path === location.pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">{currentUser.firstName}</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
              {currentUser.firstName.charAt(0)}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
