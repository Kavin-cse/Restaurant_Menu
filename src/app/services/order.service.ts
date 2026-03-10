import { Injectable, signal } from '@angular/core';
import { Order, CartItem, Customer, PaymentInfo } from '../models/models';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<Order[]>([]);
  latestOrder = signal<Order | null>(null);

  constructor(private cartService: CartService) {}

  placeOrder(customer: Customer, payment: PaymentInfo, specialInstructions?: string): Order {
    const items: CartItem[] = this.cartService.items();
    const subtotal = this.cartService.subtotal();
    const tax = this.cartService.tax();
    const discount = items.reduce((sum, ci) => {
      return sum + ((ci.menuItem.discount || 0) / 100) * ci.menuItem.price * ci.quantity;
    }, 0);

    const order: Order = {
      id: this.generateOrderId(),
      customer,
      items: [...items],
      totalAmount: subtotal + discount, // original price before discounts
      discount,
      tax,
      finalAmount: subtotal + tax,
      status: 'confirmed',
      createdAt: new Date(),
      payment,
      specialInstructions
    };

    this.orders.update(prev => [...prev, order]);
    this.latestOrder.set(order);
    this.cartService.clearCart();
    return order;
  }

  getOrders(): Order[] {
    return this.orders();
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  }
}
