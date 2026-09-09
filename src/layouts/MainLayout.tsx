import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Home, Grid, Menu, X, ChevronRight, Globe, MessageCircle } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';

export function MainLayout() {
  const { cart, favorites, currentUser } = useShopStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

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
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(true)} className="text-gray-900 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight">Lumière</Link>
          </div>
          <button onClick={() => navigate('/catalog')} className="text-gray-900">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={closeMenu} />
          
          {/* Drawer */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-xl flex flex-col overflow-y-auto z-50 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center text-sm font-medium">
                <span className="text-xs mr-2">▼</span> Алматы
              </div>
              <button onClick={closeMenu} className="p-2 -mr-2 text-gray-400 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 py-4">
              <nav className="flex flex-col space-y-6 px-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <span className="text-2xl font-medium tracking-tight lowercase">каталог</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <span className="text-2xl font-medium tracking-tight lowercase">бренды</span>
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <span className="text-2xl font-medium tracking-tight lowercase">новинки</span>
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog?sale=true'); closeMenu(); }}>
                  <span className="text-2xl font-medium tracking-tight lowercase">акции</span>
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <span className="text-2xl font-medium tracking-tight lowercase">парфюмерия</span>
                </div>

                <div className="h-px bg-gray-100 my-2" />

                <div className="flex items-center gap-3 cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <span className="text-lg">🌿</span>
                  <span className="text-xl font-medium tracking-tight lowercase">натуральный уход</span>
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog'); closeMenu(); }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">💳</span>
                    <span className="text-xl font-medium tracking-tight lowercase">подарочные карты</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate('/catalog?sale=true'); closeMenu(); }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✂️</span>
                    <span className="text-xl font-medium tracking-tight lowercase">скидки до -50%</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="h-px bg-gray-100 my-2" />

                <div className="flex flex-col space-y-4 pt-2">
                  <span className="text-base text-gray-800 lowercase cursor-pointer hover:text-accent">доставка и возврат</span>
                  <span className="text-base text-gray-800 lowercase cursor-pointer hover:text-accent">контакты</span>
                  <span className="text-base text-gray-800 lowercase cursor-pointer hover:text-accent">наши магазины</span>
                </div>
              </nav>
            </div>

            {/* Bottom Gray Area */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col space-y-6 mt-auto">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => { navigate(currentUser ? '/profile' : '/login'); closeMenu(); }}>
                <span className="text-base font-medium lowercase">войти в личный кабинет</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-medium">Русский</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-medium text-gray-500 lowercase">написать в поддержку</span>
                  <span className="text-xs text-gray-400">онлайн</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

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
