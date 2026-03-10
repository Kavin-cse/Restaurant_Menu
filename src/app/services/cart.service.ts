import { Injectable, signal, computed } from '@angular/core';
import { CartItem, MenuItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Reactive state using Angular signals
  private _items = signal<CartItem[]>([]);

  // Public read-only signal
  items = this._items.asReadonly();

  // Computed signals for derived state
  totalItems = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));

  subtotal = computed(() =>
    this._items().reduce((sum, item) => {
      const discountedPrice = item.menuItem.price * (1 - (item.menuItem.discount || 0) / 100);
      return sum + (discountedPrice * item.quantity);
    }, 0)
  );

  tax = computed(() => this.subtotal() * 0.05); // 5% GST

  total = computed(() => this.subtotal() + this.tax());

  isEmpty = computed(() => this._items().length === 0);

  addItem(menuItem: MenuItem): void {
    const currentItems = this._items();
    const existingIndex = currentItems.findIndex(ci => ci.menuItem.id === menuItem.id);

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      this._items.set(updated);
    } else {
      this._items.set([...currentItems, { menuItem, quantity: 1 }]);
    }
  }

  removeItem(menuItemId: number): void {
    this._items.update(items => items.filter(ci => ci.menuItem.id !== menuItemId));
  }

  updateQuantity(menuItemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(menuItemId);
      return;
    }
    this._items.update(items =>
      items.map(ci => ci.menuItem.id === menuItemId ? { ...ci, quantity } : ci)
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  isInCart(menuItemId: number): boolean {
    return this._items().some(ci => ci.menuItem.id === menuItemId);
  }

  getQuantity(menuItemId: number): number {
    return this._items().find(ci => ci.menuItem.id === menuItemId)?.quantity ?? 0;
  }
}
