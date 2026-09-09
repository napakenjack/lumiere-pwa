import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Home, Grid, Menu } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';

export function MainLayout() {
  const { cart, favorites, currentUser } = useShopStore();
  const location = useLocation();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white pb-16 md:pb-0">
      {/* Top Notification Bar */}
      <div className="bg-gray-900 text-white text-xs text-center py-2 font-medium tracking-wide">
        Бесплатная доставка от 25 000 ₸
      </div>

      {/* Header (Desktop) */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight">Lumière</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-900 hover:text-accent transition-colors">Главная</Link>
              <Link to="/catalog" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Каталог</Link>
              <Link to="/catalog?sale=true" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Акции</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <button onClick={() => navigate('/catalog')} className="text-gray-400 hover:text-gray-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              <Link to={currentUser ? "/profile" : "/login"} className="text-gray-400 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </Link>

              <Link to="/favorites" className="relative text-gray-400 hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-400 hover:text-gray-900 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Header (Mobile) */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 md:hidden">
        <div className="px-4 flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight">Lumière</Link>
          <button onClick={() => navigate('/catalog')} className="text-gray-900">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/' ? 'text-gray-900' : 'text-gray-400'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Главная</span>
          </Link>
          <Link to="/catalog" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/catalog' ? 'text-gray-900' : 'text-gray-400'}`}>
            <Grid className="w-5 h-5" />
            <span className="text-[10px] font-medium">Каталог</span>
          </Link>
          <Link to="/favorites" className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/favorites' ? 'text-gray-900' : 'text-gray-400'}`}>
            <div className="relative">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Избранное</span>
          </Link>
          <Link to="/cart" className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/cart' ? 'text-gray-900' : 'text-gray-400'}`}>
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-gray-900 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Корзина</span>
          </Link>
          <Link to={currentUser ? "/profile" : "/login"} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${['/profile', '/login'].includes(location.pathname) ? 'text-gray-900' : 'text-gray-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Профиль</span>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-serif text-2xl font-bold tracking-tight">Lumière</span>
            <p className="text-sm text-gray-500 mt-2">Premium cosmetics & skincare.</p>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Lumière Beauty. Demo Application.
          </div>
        </div>
      </footer>
    </div>
  );
}
