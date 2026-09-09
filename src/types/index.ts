export type Category = 'Уход за лицом' | 'Макияж' | 'Уход за телом' | 'Волосы' | 'Парфюмерия' | 'Мужская косметика' | 'Наборы' | 'Новинки';

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  usage: string;
  ingredients: string;
  rating: number;
  reviewsCount: number;
  likesCount: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
  zipCode?: string;
  comment?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  addresses: Address[];
}

export type OrderStatus = 'Новый' | 'Оплачен' | 'Обрабатывается' | 'Отправлен' | 'Доставлен' | 'Отменен';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  deliveryCost: number;
  discountAmount: number;
  finalAmount: number;
  shippingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
  status: OrderStatus;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
