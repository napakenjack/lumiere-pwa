import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, CreditCard, Wallet, MapPin } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Слишком короткое имя'),
  lastName: z.string().min(2, 'Слишком короткая фамилия'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(10, 'Некорректный телефон'),
  city: z.string().min(2, 'Обязательное поле'),
  street: z.string().min(2, 'Обязательное поле'),
  house: z.string().min(1, 'Обязательное поле'),
  apartment: z.string().optional(),
  comment: z.string().optional(),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const navigate = useNavigate();
  const { cart, createOrder, clearCart, currentUser } = useShopStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kaspi' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const delivery = subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + delivery;

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    }
  });

  const handleNextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(['firstName', 'lastName', 'email', 'phone']);
    } else if (step === 2) {
      valid = await trigger(['city', 'street', 'house']);
    }
    
    if (valid) setStep(s => (s + 1) as 1 | 2 | 3);
  };

  const onSubmit = (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      createOrder({
        id: crypto.randomUUID(),
        orderNumber,
        userId: currentUser?.id || 'guest',
        date: new Date().toISOString(),
        items: cart,
        totalAmount: subtotal,
        deliveryCost: delivery,
        discountAmount: 0,
        finalAmount: total,
        status: 'Оплачен',
        shippingAddress: {
          city: data.city,
          street: data.street,
          house: data.house,
          apartment: data.apartment,
          comment: data.comment,
        },
        deliveryMethod: 'courier',
        paymentMethod: paymentMethod,
        customerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        }
      });

      clearCart();
      setIsProcessing(false);
      navigate('/success', { state: { orderNumber } });
    }, 2000);
  };

  if (cart.length === 0) {
    return <div className="p-20 text-center">Корзина пуста</div>;
  }

  return (
    <div className="py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Оформление заказа</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          {/* Stepper logic */}
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-gray-900' : 'bg-gray-100'}`} />}
              </React.Fragment>
            ))}
          </div>

          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold mb-4">1. Контактные данные</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Имя" {...register('firstName')} error={errors.firstName?.message} />
                  <Input placeholder="Фамилия" {...register('lastName')} error={errors.lastName?.message} />
                  <Input placeholder="Email" type="email" {...register('email')} error={errors.email?.message} />
                  <Input placeholder="Телефон" type="tel" {...register('phone')} error={errors.phone?.message} />
                </div>
                <Button type="button" onClick={handleNextStep} className="mt-4">Далее</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold mb-4">2. Адрес доставки</h2>
                <Input placeholder="Город" {...register('city')} error={errors.city?.message} />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Input placeholder="Улица" {...register('street')} error={errors.street?.message} />
                  </div>
                  <Input placeholder="Дом" {...register('house')} error={errors.house?.message} />
                </div>
                <Input placeholder="Квартира / офис (необязательно)" {...register('apartment')} />
                <Input placeholder="Комментарий курьеру" {...register('comment')} />
                
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Назад</Button>
                  <Button type="button" onClick={handleNextStep}>Далее</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold mb-4">3. Оплата</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-colors ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                    <CreditCard className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Карта</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('kaspi')} className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-colors ${paymentMethod === 'kaspi' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Kaspi Pay</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('cash')} className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-colors ${paymentMethod === 'cash' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">При получении</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-bold">Демонстрационная оплата</p>
                    <Input placeholder="Номер карты" maxLength={16} {...register('cardNumber')} />
                    <Input placeholder="Имя владельца" {...register('cardName')} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" maxLength={5} {...register('cardExpiry')} />
                      <Input placeholder="CVV" maxLength={3} type="password" {...register('cardCvv')} />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>Назад</Button>
                  <Button type="submit" form="checkout-form" disabled={isProcessing}>
                    {isProcessing ? 'Обрабатываем платеж...' : `Оплатить ${formatPrice(total)}`}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Summary side */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 sticky top-28">
            <h2 className="text-xl font-serif font-bold mb-6">Ваш заказ</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-gray-500">{item.quantity} шт. × {formatPrice(item.product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span className="font-medium text-gray-900">{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                <span className="text-base font-bold text-gray-900">К оплате</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
