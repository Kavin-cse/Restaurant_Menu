// ============================================================
// Data Models for the Restaurant Menu & Ordering System
// ============================================================

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  rating: number;
  prepTime: number; // minutes
  isVeg: boolean;
  isRecommended?: boolean;
  discount?: number; // percentage
  calories?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface PaymentInfo {
  method: 'card' | 'upi' | 'cash';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  totalAmount: number;
  discount: number;
  tax: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  createdAt: Date;
  payment: PaymentInfo;
  specialInstructions?: string;
}
