import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const { products } = useShopStore();

  const categories = [
    { name: 'Уход за лицом', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80' },
    { name: 'Макияж', image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=735&auto=format&fit=crop' },
    { name: 'Уход за телом', image: 'https://plus.unsplash.com/premium_photo-1679046948909-ab47e96082e7?q=80&w=687&auto=format&fit=crop' },
    { name: 'Парфюмерия', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80' }
  ];

  const popularProducts = products.filter(p => p.isBestseller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const saleProducts = products.filter(p => p.discount && p.discount > 0).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* Hero Carousel Banner */}
      <section className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-secondary">
        <img 
          src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=1470&auto=format&fit=crop" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 text-white">
          <span className="text-sm font-bold tracking-widest uppercase mb-2">Новая коллекция</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 max-w-xl leading-tight">
            Естественная красота без компромиссов
          </h1>
          <p className="text-lg mb-8 max-w-md text-gray-100">Откройте для себя премиальный уход за кожей.</p>
          <div>
            <Link to="/catalog" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold">Категории</h2>
          <Link to="/catalog" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            Все <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link key={i} to={`/catalog?category=${cat.name}`} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                <span className="text-lg md:text-xl font-medium font-serif">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold">Популярные товары</h2>
          <Link to="/catalog?sort=popular" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            Все <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner 2 */}
      <section className="relative w-full h-[250px] md:h-[300px] rounded-3xl overflow-hidden bg-accent/20">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">Скидка до 30% на уход за кожей</h2>
          <p className="text-gray-600 mb-6 max-w-lg">Только до конца недели успейте приобрести бестселлеры по специальной цене.</p>
          <Link to="/catalog?sale=true" className="inline-flex items-center text-accent font-bold hover:underline">
            Перейти к акции <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Sale Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold">Товары со скидкой</h2>
          <Link to="/catalog?sale=true" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            Все <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold">Новинки</h2>
          <Link to="/catalog?sort=new" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            Все <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
