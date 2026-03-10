import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="confirmation-page">
      <div class="confirmation-container" *ngIf="order; else noOrder">
        <!-- Success Animation -->
        <div class="success-circle">
          <div class="check-icon">✓</div>
          <div class="ripple r1"></div>
          <div class="ripple r2"></div>
          <div class="ripple r3"></div>
        </div>

        <h1>Order Confirmed! 🎉</h1>
        <p class="subtitle">Thank you, <strong>{{ order.customer.name }}</strong>! Your order is being prepared.</p>

        <div class="order-id-card">
          <span class="order-id-label">Order ID</span>
          <span class="order-id">{{ order.id }}</span>
        </div>

        <!-- Status Timeline -->
        <div class="status-timeline">
          <div class="timeline-step active">
            <mat-icon>check_circle</mat-icon>
            <div>
              <div class="step-title">Order Confirmed</div>
              <div class="step-sub">{{ order.createdAt | date:'short' }}</div>
            </div>
          </div>
          <div class="timeline-line active"></div>
          <div class="timeline-step active">
            <mat-icon>restaurant</mat-icon>
            <div>
              <div class="step-title">Preparing</div>
              <div class="step-sub">~20 minutes</div>
            </div>
          </div>
          <div class="timeline-line"></div>
          <div class="timeline-step">
            <mat-icon>local_shipping</mat-icon>
            <div>
              <div class="step-title">On the Way</div>
              <div class="step-sub">Est. 30-45 min</div>
            </div>
          </div>
          <div class="timeline-line"></div>
          <div class="timeline-step">
            <mat-icon>home</mat-icon>
            <div>
              <div class="step-title">Delivered</div>
              <div class="step-sub">Soon!</div>
            </div>
          </div>
        </div>

        <!-- Order Details -->
        <div class="order-details-card">
          <h2>Order Details</h2>
          <div class="order-items">
            <div *ngFor="let ci of order.items" class="order-item">
              <img [src]="ci.menuItem.image" [alt]="ci.menuItem.name" class="order-item-img">
              <span class="order-item-name">{{ ci.menuItem.name }}</span>
              <span class="order-item-qty">× {{ ci.quantity }}</span>
              <span class="order-item-price">₹{{ (ci.menuItem.price * (1 - (ci.menuItem.discount || 0)/100) * ci.quantity) | number:'1.0-0' }}</span>
            </div>
          </div>

          <mat-divider class="divider"></mat-divider>

          <div class="order-summary">
            <div class="summary-row"><span>Subtotal</span><span>₹{{ order.totalAmount - order.discount | number:'1.0-2' }}</span></div>
            <div class="summary-row"><span>GST (5%)</span><span>₹{{ order.tax | number:'1.0-2' }}</span></div>
            <div class="summary-row"><span>Delivery</span><span class="free">FREE</span></div>
            <div class="summary-row grand"><span>Total Paid</span><span class="total">₹{{ order.finalAmount | number:'1.0-2' }}</span></div>
          </div>
        </div>

        <!-- Delivery Info -->
        <div class="delivery-card">
          <h3><mat-icon>location_on</mat-icon> Delivery Address</h3>
          <p>{{ order.customer.address }}, {{ order.customer.city }} - {{ order.customer.pincode }}</p>
          <p><mat-icon>phone</mat-icon> {{ order.customer.phone }}</p>
        </div>

        <!-- Actions -->
        <div class="actions">
          <a routerLink="/menu" mat-raised-button class="order-more-btn" id="order-more-btn">
            <mat-icon>restaurant_menu</mat-icon>
            Order More
          </a>
          <a routerLink="/" mat-stroked-button class="home-btn" id="go-home-btn">
            <mat-icon>home</mat-icon>
            Back to Home
          </a>
        </div>
      </div>

      <ng-template #noOrder>
        <div class="no-order">
          <mat-icon>receipt_long</mat-icon>
          <h2>No order found</h2>
          <a routerLink="/menu" mat-raised-button id="browse-btn">Browse Menu</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .confirmation-page {
      min-height: 100vh;
      background: #0f0e17;
      padding: 100px 24px 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .confirmation-container {
      max-width: 700px;
      width: 100%;
      text-align: center;
    }

    /* Success Animation */
    .success-circle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin-bottom: 24px;
    }

    .check-icon {
      font-size: 3rem;
      color: #4caf50;
      background: rgba(76,175,80,0.15);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(76,175,80,0.4);
      z-index: 2;
      position: relative;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(76,175,80,0.3);
      animation: rippleOut 2s ease-out infinite;
    }

    .r1 { width: 80px; height: 80px; animation-delay: 0s; }
    .r2 { width: 90px; height: 90px; animation-delay: 0.5s; }
    .r3 { width: 100px; height: 100px; animation-delay: 1s; }

    @keyframes rippleOut {
      0% { transform: scale(0.9); opacity: 0.8; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: #fff;
      margin-bottom: 8px;
    }

    .subtitle {
      color: rgba(255,255,255,0.55);
      font-size: 1rem;
      margin-bottom: 24px;

      strong { color: #f5a623; }
    }

    .order-id-card {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(245,166,35,0.1);
      border: 1px solid rgba(245,166,35,0.25);
      border-radius: 12px;
      padding: 10px 24px;
      margin-bottom: 36px;
    }

    .order-id-label {
      color: rgba(255,255,255,0.4);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .order-id {
      color: #f5a623;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 1px;
    }

    /* Timeline */
    .status-timeline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 40px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .timeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.25);

      mat-icon { font-size: 1.5rem; width: 1.5rem; height: 1.5rem; }

      &.active {
        color: #4caf50;
      }
    }

    .step-title { font-size: 0.78rem; font-weight: 600; }
    .step-sub { font-size: 0.68rem; color: rgba(255,255,255,0.35); }

    .timeline-line {
      width: 40px;
      height: 2px;
      background: rgba(255,255,255,0.1);

      &.active { background: #4caf50; }
    }

    /* Cards */
    .order-details-card, .delivery-card {
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      padding: 24px;
      text-align: left;
      margin-bottom: 20px;

      h2, h3 {
        font-family: 'Playfair Display', serif;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 16px;
        font-size: 1.1rem;

        mat-icon { color: #f5a623; font-size: 1.2rem; }
      }
    }

    .order-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .order-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .order-item-img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .order-item-name { flex: 1; color: rgba(255,255,255,0.8); font-size: 0.88rem; }
    .order-item-qty { color: rgba(255,255,255,0.35); font-size: 0.8rem; }
    .order-item-price { color: #f5a623; font-weight: 600; font-size: 0.9rem; }

    .divider { border-color: rgba(255,255,255,0.08) !important; margin: 16px 0 !important; }

    .order-summary { display: flex; flex-direction: column; gap: 8px; }

    .summary-row {
      display: flex;
      justify-content: space-between;
      color: rgba(255,255,255,0.5);
      font-size: 0.88rem;
    }

    .free { color: #4caf50; }
    .grand { color: #fff; font-weight: 600; font-size: 1rem; }
    .total { color: #f5a623; font-weight: 700; font-size: 1.2rem; }

    .delivery-card p {
      color: rgba(255,255,255,0.55);
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;

      mat-icon { font-size: 1rem; color: #f5a623; }
    }

    /* Actions */
    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .order-more-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 12px 28px !important;
      font-size: 0.95rem !important;
    }

    .home-btn {
      border-color: rgba(255,255,255,0.2) !important;
      color: rgba(255,255,255,0.7) !important;
      border-radius: 50px !important;
      padding: 12px 28px !important;
    }

    .no-order {
      text-align: center;
      color: rgba(255,255,255,0.5);
      padding: 60px;

      mat-icon { font-size: 4rem; width: 4rem; height: 4rem; }
      h2 { color: #fff; font-family: 'Playfair Display', serif; margin: 16px 0; }
    }

    @media (max-width: 600px) {
      .status-timeline { gap: 4px; }
      .timeline-line { width: 20px; }
    }
  `]
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.order = this.orderService.latestOrder();
  }
}
