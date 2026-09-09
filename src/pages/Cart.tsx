import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';

export function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useShopStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const originalTotal = cart.reduce((acc, item) => acc + ((item.product.oldPrice || item.product.price) * item.quantity), 0);
  const discount = originalTotal - subtotal;
  const delivery = subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + (cart.length > 0 ? delivery : 0);

  if (cart.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Корзина пока пуста</h1>
        <p className="text-gray-500 mb-8 max-w-sm">Добавьте товары из каталога, чтобы оформить заказ.</p>
        <Link to="/catalog">
          <Button>Перейти к покупкам</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Корзина</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 md:gap-6 border-b border-gray-100 pb-6">
                <Link to={`/product/${item.product.id}`} className="w-24 h-32 md:w-32 md:h-40 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">{item.product.brand}</p>
                      <Link to={`/product/${item.product.id}`} className="text-sm md:text-base font-semibold text-gray-900 leading-tight hover:text-accent">
                        {item.product.name}
                      </Link>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg h-10">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-3 h-full text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                        className="px-3 h-full text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-base md:text-lg font-bold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.product.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(item.product.oldPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 sticky top-28">
            <h2 className="text-xl font-serif font-bold mb-6">Ваш заказ</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары ({cart.length})</span>
                <span className="font-medium text-gray-900">{formatPrice(originalTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-500">
                  <span>Скидка</span>
                  <span className="font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span className="font-medium text-gray-900">{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold text-gray-900">Итого</span>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>
            
            <Button size="lg" className="w-full" onClick={() => navigate('/checkout')}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
