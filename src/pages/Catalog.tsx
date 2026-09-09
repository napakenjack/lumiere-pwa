import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { Button } from '../components/ui/Button';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Популярные' },
  { value: 'new', label: 'Новые' },
  { value: 'price_asc', label: 'Сначала дешевые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
  { value: 'rating', label: 'По рейтингу' },
];

export function Catalog() {
  const { products } = useShopStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const currentCategory = searchParams.get('category');
  const currentSale = searchParams.get('sale') === 'true';
  const currentSort = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('q') || '';

  const categories: Category[] = [
    'Уход за лицом', 'Макияж', 'Уход за телом', 'Волосы', 'Парфюмерия', 'Мужская косметика', 'Наборы', 'Новинки'
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (currentCategory) {
      if (currentCategory === 'Новинки') {
        result = result.filter(p => p.isNew);
      } else {
        result = result.filter(p => p.category === currentCategory);
      }
    }

    // Sale filter
    if (currentSale) {
      result = result.filter(p => p.discount && p.discount > 0);
    }

    // Sort
    result.sort((a, b) => {
      switch (currentSort) {
        case 'new': return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'popular':
        default: return b.likesCount - a.likesCount;
      }
    });

    return result;
  }, [products, currentCategory, currentSale, currentSort, searchQuery]);

  const updateFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8 relative">
      
      {/* Mobile Filter Button */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif font-bold">Каталог</h1>
        <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <Filter className="w-4 h-4 mr-2" /> Фильтры
        </Button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`w-full md:w-64 flex-shrink-0 flex flex-col gap-8 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Категории</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => updateFilters('category', null)}
                className={`text-sm ${!currentCategory && !currentSale ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Все товары
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => {
                    updateFilters('sale', null);
                    updateFilters('category', cat);
                  }}
                  className={`text-sm ${currentCategory === cat ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={() => {
                  updateFilters('category', null);
                  updateFilters('sale', 'true');
                }}
                className={`text-sm ${currentSale ? 'text-red-500 font-bold' : 'text-red-500 hover:text-red-600'}`}
              >
                Товары со скидкой
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold">
            {searchQuery ? `Поиск: ${searchQuery}` : currentSale ? 'Акции' : currentCategory || 'Все товары'}
            <span className="text-base text-gray-400 font-sans ml-3 font-normal">{filteredProducts.length} товаров</span>
          </h1>

          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
              {SORT_OPTIONS.find(o => o.value === currentSort)?.label}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateFilters('sort', option.value)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 ${currentSort === option.value ? 'font-bold text-gray-900' : 'text-gray-600'}`}
                >
                  {option.label}
                  {currentSort === option.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg mb-4">По вашему запросу ничего не найдено</p>
            <Button onClick={() => { setSearchParams(new URLSearchParams()); }}>
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
