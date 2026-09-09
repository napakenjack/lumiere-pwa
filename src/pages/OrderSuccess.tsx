import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function OrderSuccess() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || 'ORD-TEST';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Спасибо за заказ!</h1>
      <p className="text-lg text-gray-600 mb-2">Ваш заказ успешно оформлен и передан в обработку.</p>
      <p className="text-sm text-gray-500 font-medium mb-12">Номер заказа: <span className="text-gray-900">{orderNumber}</span></p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/profile">
          <Button variant="outline" className="w-full sm:w-auto">Перейти к заказам</Button>
        </Link>
        <Link to="/catalog">
          <Button className="w-full sm:w-auto">Продолжить покупки</Button>
        </Link>
      </div>
    </div>
  );
}
