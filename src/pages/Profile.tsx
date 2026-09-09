import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, User, MapPin } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';

export function Profile() {
  const { currentUser, logout, orders } = useShopStore();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userOrders = orders.filter(o => o.userId === currentUser.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="py-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Личный кабинет</h1>
        <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" /> Выйти
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 mb-4">
              {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser.firstName} {currentUser.lastName}</h2>
            <p className="text-sm text-gray-500 mb-6">{currentUser.email}</p>
            
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-3" />
                {currentUser.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Orders History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-serif font-bold mb-6 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            История заказов
          </h2>

          {userOrders.length === 0 ? (
            <div className="p-8 bg-gray-50 rounded-3xl text-center border border-gray-100">
              <p className="text-gray-500">У вас пока нет заказов</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6 transition-shadow hover:shadow-md">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatPrice(order.finalAmount)}</p>
                      <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        order.status === 'Доставлен' ? 'bg-green-100 text-green-700' :
                        order.status === 'Отменен' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items.map(item => (
                      <div key={item.product.id} className="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
