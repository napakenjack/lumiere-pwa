import React from 'react';
import { Link } from 'react-router-dom';
import { useShopStore } from '../store/useShopStore';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';

export function Favorites() {
  const { products, favorites } = useShopStore();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <HeartIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-4">Нет избранных товаров</h1>
        <p className="text-gray-500 mb-8 max-w-sm">Вы еще не добавили ни одного товара в избранное. Перейдите в каталог, чтобы выбрать что-нибудь интересное.</p>
        <Link to="/catalog">
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Избранное <span className="text-base font-sans text-gray-400 ml-2 font-normal">{favoriteProducts.length}</span></h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {favoriteProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
