import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useShopStore } from '../store/useShopStore';
import { formatPrice } from '../lib/utils';
import { Button } from './ui/Button';

export function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, favorites, addToCart } = useShopStore();
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="group flex flex-col relative transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount ? (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            -{product.discount}%
          </span>
        ) : null}
        {product.isNew ? (
          <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
            NEW
          </span>
        ) : null}
        {product.isBestseller ? (
          <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
            HIT
          </span>
        ) : null}
      </div>

      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-900 transition-transform hover:scale-110"
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/50 mb-4">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">Нет в наличии</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 px-1">
        <Link to={`/product/${product.id}`} className="block mb-1">
          <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{product.brand}</p>
          <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 mt-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
          </div>
          
          <Button 
            size="sm"
            disabled={product.stock === 0}
            onClick={() => addToCart(product, 1)}
            className="rounded-full px-4"
          >
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
}
