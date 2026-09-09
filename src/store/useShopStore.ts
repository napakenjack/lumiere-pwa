import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order, User, Category } from '../types';
import { mockProducts } from '../data/mockData';

interface ShopState {
  products: Product[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  favorites: string[]; // array of product IDs
  
  // Actions
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (productId: string) => void;
  
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (user: User) => void;
  
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      orders: [],
      users: [
        {
          id: 'user1',
          firstName: 'Тест',
          lastName: 'Пользователь',
          email: 'user@demo.kz',
          phone: '+7 777 000 0000',
          role: 'user',
          addresses: []
        },
        {
          id: 'admin1',
          firstName: 'Админ',
          lastName: 'Админов',
          email: 'admin@demo.kz',
          phone: '+7 700 000 0000',
          role: 'admin',
          addresses: []
        }
      ],
      currentUser: null,
      cart: [],
      favorites: [],

      setProducts: (products) => set({ products }),
      updateProduct: (product) => set((state) => ({
        products: state.products.map(p => p.id === product.id ? product : p)
      })),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),

      addToCart: (product, quantity) => set((state) => {
        const existing = state.cart.find(item => item.product.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return { cart: [...state.cart, { product, quantity }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.product.id !== productId)
      })),
      updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),

      toggleFavorite: (productId) => set((state) => {
        const isFav = state.favorites.includes(productId);
        if (isFav) {
          return { favorites: state.favorites.filter(id => id !== productId) };
        }
        return { favorites: [...state.favorites, productId] };
      }),

      login: (email, pass) => {
        const { users } = get();
        // Fake authentication logic
        if (email === 'user@demo.kz' && pass === '123456') {
          set({ currentUser: users.find(u => u.email === email) });
          return true;
        }
        if (email === 'admin@demo.kz' && pass === 'admin123') {
          set({ currentUser: users.find(u => u.email === email) });
          return true;
        }
        return false;
      },
      logout: () => set({ currentUser: null }),
      updateProfile: (user) => set((state) => ({
        currentUser: user,
        users: state.users.map(u => u.id === user.id ? user : u)
      })),

      createOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      }))
    }),
    {
      name: 'lumiere-storage',
    }
  )
);
