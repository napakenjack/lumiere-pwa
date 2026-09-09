import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Minus, Plus, ShoppingBag, Truck, ArrowLeft } from 'lucide-react';
import { useShopStore } from '../store/useShopStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleFavorite, favorites } = useShopStore();
  
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'usage' | 'ingredients'>('description');

  if (!product) {
    return <div className="p-20 text-center text-xl">Товар не найден</div>;
  }

  const isFavorite = favorites.includes(product.id);

  return (
    <div className="py-8 pb-24 md:pb-8">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Назад
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[4/5] bg-secondary rounded-3xl overflow-hidden">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.discount ? <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">-{product.discount}%</span> : null}
              {product.isNew && <span className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg">NEW</span>}
            </div>

            <button 
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/80 backdrop-blur-md text-gray-900 transition-transform hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          {/* Thumbnails if > 1 */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === i ? 'border-gray-900' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">{product.brand}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-bold">{product.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <button className="text-sm font-medium text-gray-500 underline underline-offset-4">{product.reviewsCount} отзывов</button>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1">{formatPrice(product.oldPrice)}</span>}
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3">
              {product.stock === 0 ? (
                <span className="text-red-500 font-medium">Нет в наличии</span>
              ) : product.stock < 5 ? (
                <span className="text-orange-500 font-medium">Осталось всего {product.stock} шт.</span>
              ) : (
                <span className="text-green-600 font-medium">В наличии</span>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl h-14">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 h-full text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-4 h-full text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                size="lg" 
                className="flex-1" 
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product, quantity);
                  // Optional: Show toast
                }}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-2xl flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <p className="font-semibold text-sm">Бесплатная доставка</p>
              <p className="text-xs text-gray-500 mt-0.5">При заказе от 25 000 ₸. Доставка курьером по городу.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 pt-8 mt-auto">
            <div className="flex gap-8 mb-6 border-b border-gray-200 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab('description')} 
                className={`pb-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'description' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'}`}
              >
                Описание
              </button>
              <button 
                onClick={() => setActiveTab('usage')} 
                className={`pb-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'usage' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'}`}
              >
                Способ применения
              </button>
              <button 
                onClick={() => setActiveTab('ingredients')} 
                className={`pb-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'ingredients' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500'}`}
              >
                Состав
              </button>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed min-h-[120px]">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'usage' && <p>{product.usage}</p>}
              {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
