import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatButtonModule, MatIconModule, MatDividerModule, MatSnackBarModule
  ],
  template: `
    <div class="cart-page">
      <div class="cart-container">
        <div class="page-header">
          <h1>Your Cart</h1>
          <span class="item-count" *ngIf="!cartService.isEmpty()">
            {{ cartService.totalItems() }} item{{ cartService.totalItems() > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Empty Cart State -->
        <div class="empty-cart" *ngIf="cartService.isEmpty()">
          <div class="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Explore our menu!</p>
          <a routerLink="/menu" mat-raised-button class="explore-btn" id="explore-menu-btn">
            <mat-icon>restaurant_menu</mat-icon>
            Explore Menu
          </a>
        </div>

        <!-- Cart Content -->
        <div class="cart-content" *ngIf="!cartService.isEmpty()">
          <!-- Items List -->
          <div class="cart-items">
            <div class="cart-item" *ngFor="let ci of cartService.items(); let i = index" [id]="'cart-item-' + ci.menuItem.id">
              <img [src]="ci.menuItem.image" [alt]="ci.menuItem.name" class="item-image">
              
              <div class="item-details">
                <h3 class="item-name">{{ ci.menuItem.name }}</h3>
                <p class="item-category">{{ ci.menuItem.category | titlecase }}</p>
                <div class="item-price-row">
                  <span class="unit-price">₹{{ getUnitPrice(ci) | number:'1.0-0' }} each</span>
                  <span class="discount-tag" *ngIf="ci.menuItem.discount && ci.menuItem.discount > 0">
                    -{{ ci.menuItem.discount }}%
                  </span>
                </div>
              </div>

              <div class="item-controls">
                <!-- Quantity -->
                <div class="qty-control">
                  <button mat-mini-fab class="qty-btn dec" 
                    (click)="updateQty(ci, -1)" [id]="'dec-' + ci.menuItem.id">
                    <mat-icon>{{ ci.quantity === 1 ? 'delete' : 'remove' }}</mat-icon>
                  </button>
                  <span class="qty">{{ ci.quantity }}</span>
                  <button mat-mini-fab class="qty-btn inc" 
                    (click)="updateQty(ci, 1)" [id]="'inc-' + ci.menuItem.id">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>

                <!-- Line Total -->
                <div class="line-total">₹{{ getLineTotal(ci) | number:'1.0-0' }}</div>

                <!-- Remove -->
                <button mat-icon-button class="remove-btn" 
                  (click)="removeItem(ci)" [id]="'remove-' + ci.menuItem.id">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <div class="summary-header">
              <h2>Order Summary</h2>
            </div>

            <div class="summary-body">
              <!-- Mini Items Preview -->
              <div class="mini-items">
                <div *ngFor="let ci of cartService.items()" class="mini-item">
                  <span>{{ ci.menuItem.name }} × {{ ci.quantity }}</span>
                  <span>₹{{ getLineTotal(ci) | number:'1.0-0' }}</span>
                </div>
              </div>

              <mat-divider class="divider"></mat-divider>

              <!-- Totals -->
              <div class="totals">
                <div class="total-row">
                  <span>Subtotal</span>
                  <span>₹{{ cartService.subtotal() | number:'1.0-2' }}</span>
                </div>
                <div class="total-row">
                  <span>GST (5%)</span>
                  <span>₹{{ cartService.tax() | number:'1.0-2' }}</span>
                </div>
                <div class="total-row">
                  <span>Delivery</span>
                  <span class="free">FREE</span>
                </div>
              </div>

              <mat-divider class="divider"></mat-divider>

              <div class="grand-total">
                <span>Total</span>
                <span class="total-amount">₹{{ cartService.total() | number:'1.0-2' }}</span>
              </div>

              <!-- Promo Code -->
              <div class="promo-section">
                <div class="promo-input">
                  <input type="text" placeholder="Enter promo code" [(ngModel)]="promoCode" id="promo-input">
                  <button class="apply-btn" (click)="applyPromo()" id="apply-promo">Apply</button>
                </div>
              </div>

              <!-- CTA -->
              <a routerLink="/checkout" mat-raised-button class="checkout-btn" id="checkout-btn">
                <mat-icon>payment</mat-icon>
                Proceed to Checkout
              </a>

              <a routerLink="/menu" mat-stroked-button class="continue-btn" id="continue-shopping-btn">
                <mat-icon>arrow_back</mat-icon>
                Continue Shopping
              </a>

              <!-- Clear Cart -->
              <button mat-button class="clear-btn" (click)="clearCart()" id="clear-cart-btn">
                <mat-icon>delete_sweep</mat-icon>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      min-height: 100vh;
      background: #0f0e17;
      padding: 100px 24px 60px;
    }

    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 36px;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: #fff;
      margin: 0;
    }

    .item-count {
      color: rgba(255,255,255,0.4);
      font-size: 1rem;
    }

    /* Empty State */
    .empty-cart {
      text-align: center;
      padding: 80px 20px;
      color: rgba(255,255,255,0.6);
    }

    .empty-icon {
      font-size: 5rem;
      margin-bottom: 20px;
    }

    .empty-cart h2 {
      font-family: 'Playfair Display', serif;
      color: #fff;
      font-size: 1.8rem;
      margin-bottom: 12px;
    }

    .empty-cart p {
      margin-bottom: 32px;
      color: rgba(255,255,255,0.5);
    }

    .explore-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 12px 28px !important;

      mat-icon { margin-right: 6px; }
    }

    /* Cart Content Layout */
    .cart-content {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 32px;
      align-items: start;
    }

    /* Cart Items */
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      transition: border-color 0.2s;

      &:hover { border-color: rgba(245,166,35,0.2); }
    }

    .item-image {
      width: 90px;
      height: 90px;
      border-radius: 12px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      font-family: 'Playfair Display', serif;
      color: #fff;
      font-size: 1.1rem;
      margin: 0 0 4px;
    }

    .item-category {
      color: #f5a623;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 6px;
    }

    .item-price-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .unit-price {
      color: rgba(255,255,255,0.5);
      font-size: 0.85rem;
    }

    .discount-tag {
      background: rgba(76,175,80,0.2);
      color: #4caf50;
      padding: 2px 8px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .qty-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .qty-btn {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
      box-shadow: none !important;

      mat-icon { font-size: 1rem; }
    }

    .qty-btn.dec {
      background: rgba(255,255,255,0.06) !important;
      color: rgba(255,255,255,0.7) !important;
    }

    .qty-btn.inc {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: #fff !important;
    }

    .qty {
      min-width: 24px;
      text-align: center;
      font-weight: 700;
      color: #fff;
      font-size: 1rem;
    }

    .line-total {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f5a623;
      min-width: 70px;
      text-align: right;
    }

    .remove-btn {
      color: rgba(255,255,255,0.3) !important;
      transition: color 0.2s;

      &:hover { color: #e74c3c !important; }
    }

    /* Order Summary */
    .order-summary {
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      overflow: hidden;
      position: sticky;
      top: 90px;
    }

    .summary-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);

      h2 {
        font-family: 'Playfair Display', serif;
        color: #fff;
        margin: 0;
        font-size: 1.3rem;
      }
    }

    .summary-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .mini-items {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .mini-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.55);
    }

    .divider {
      border-color: rgba(255,255,255,0.08) !important;
    }

    .totals {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      color: rgba(255,255,255,0.6);
      font-size: 0.9rem;
    }

    .free {
      color: #4caf50;
      font-weight: 600;
    }

    .grand-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .grand-total span:first-child {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
    }

    .total-amount {
      font-size: 1.6rem;
      font-weight: 800;
      color: #f5a623;
    }

    /* Promo */
    .promo-input {
      display: flex;
      gap: 0;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 10px;
      overflow: hidden;

      input {
        flex: 1;
        padding: 10px 14px;
        background: rgba(255,255,255,0.05);
        border: none;
        outline: none;
        color: #fff;
        font-size: 0.85rem;

        &::placeholder { color: rgba(255,255,255,0.3); }
      }

      .apply-btn {
        padding: 0 16px;
        background: rgba(245,166,35,0.15);
        color: #f5a623;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 600;
        transition: background 0.2s;

        &:hover { background: rgba(245,166,35,0.3); }
      }
    }

    .checkout-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 12px !important;
      padding: 14px !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      box-shadow: 0 6px 20px rgba(245,166,35,0.3) !important;
    }

    .continue-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      border-color: rgba(255,255,255,0.15) !important;
      color: rgba(255,255,255,0.6) !important;
      border-radius: 12px !important;
    }

    .clear-btn {
      color: rgba(255,255,255,0.3) !important;
      font-size: 0.8rem !important;
      width: 100%;

      mat-icon { font-size: 1rem; margin-right: 4px; }

      &:hover { color: #e74c3c !important; }
    }

    @media (max-width: 900px) {
      .cart-content { grid-template-columns: 1fr; }
      .order-summary { position: static; }
    }

    @media (max-width: 600px) {
      .cart-item { flex-wrap: wrap; gap: 12px; }
      .item-controls { width: 100%; justify-content: space-between; }
      .item-image { width: 70px; height: 70px; }
    }
  `]
})
export class CartComponent {
  promoCode = '';

  constructor(
    public cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  updateQty(ci: CartItem, delta: number): void {
    const newQty = ci.quantity + delta;
    if (newQty <= 0) {
      this.cartService.removeItem(ci.menuItem.id);
      this.snackBar.open(`${ci.menuItem.name} removed from cart`, '', {
        duration: 2000, panelClass: ['info-snack'],
        horizontalPosition: 'end', verticalPosition: 'bottom'
      });
    } else {
      this.cartService.updateQuantity(ci.menuItem.id, newQty);
    }
  }

  removeItem(ci: CartItem): void {
    this.cartService.removeItem(ci.menuItem.id);
    this.snackBar.open(`${ci.menuItem.name} removed`, '', {
      duration: 2000, panelClass: ['info-snack'],
      horizontalPosition: 'end', verticalPosition: 'bottom'
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Cart cleared', '', {
      duration: 2000, panelClass: ['info-snack'],
      horizontalPosition: 'end', verticalPosition: 'bottom'
    });
  }

  applyPromo(): void {
    if (this.promoCode.trim()) {
      this.snackBar.open(`Promo code "${this.promoCode}" is not valid`, 'OK', {
        duration: 3000, panelClass: ['error-snack'],
        horizontalPosition: 'end', verticalPosition: 'bottom'
      });
    }
  }

  getUnitPrice(ci: CartItem): number {
    return ci.menuItem.price * (1 - (ci.menuItem.discount || 0) / 100);
  }

  getLineTotal(ci: CartItem): number {
    return this.getUnitPrice(ci) * ci.quantity;
  }
}
