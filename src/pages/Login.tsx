import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopStore } from '../store/useShopStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useShopStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      // Determine where to redirect based on role
      const user = useShopStore.getState().currentUser;
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="py-20 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Вход</h1>
          <p className="text-sm text-gray-500">Пожалуйста, войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}
          
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <Button type="submit" size="lg" className="w-full">Войти</Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-4">Демо-доступы:</p>
          <div className="space-y-4 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-100">
            <div>
              <span className="font-bold text-gray-900 block mb-1">Покупатель:</span>
              Email: user@demo.kz<br/>
              Пароль: 123456
            </div>
            <div className="pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900 block mb-1">Администратор:</span>
              Email: admin@demo.kz<br/>
              Пароль: admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
