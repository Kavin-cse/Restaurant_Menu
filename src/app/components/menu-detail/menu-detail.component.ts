import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/models';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, MatDividerModule
  ],
  template: `
    <div class="detail-page">
      <div class="detail-container" *ngIf="item; else notFound">
        <!-- Back Button -->
        <a routerLink="/menu" mat-stroked-button class="back-btn">
          <mat-icon>arrow_back</mat-icon> Back to Menu
        </a>

        <div class="detail-grid">
          <!-- Image Section -->
          <div class="detail-image-section">
            <div class="image-wrapper">
              <img [src]="item.image" [alt]="item.name" class="detail-img">
              <div class="image-overlay"></div>
            </div>

            <div class="detail-badges">
              <span class="badge" [class.veg]="item.isVeg" [class.nonveg]="!item.isVeg">
                <span class="dot"></span>
                {{ item.isVeg ? 'Vegetarian' : 'Non-Vegetarian' }}
              </span>
              <span class="badge recommended" *ngIf="item.isRecommended">⭐ Chef's Pick</span>
              <span class="badge discount" *ngIf="item.discount && item.discount > 0">{{ item.discount }}% OFF</span>
            </div>
          </div>

          <!-- Info Section -->
          <div class="detail-info">
            <div class="info-meta">
              <span class="category-tag">{{ item.category | titlecase }}</span>
              <div class="rating-block">
                <mat-icon class="star-icon">star</mat-icon>
                <span class="rating">{{ item.rating }}</span>
                <span class="rating-label">/5.0</span>
              </div>
            </div>

            <h1 class="item-title">{{ item.name }}</h1>
            <p class="item-description">{{ item.description }}</p>

            <mat-divider class="divider"></mat-divider>

            <!-- Stats Row -->
            <div class="stats-row">
              <div class="stat-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <div class="stat-label">Prep Time</div>
                  <div class="stat-value">{{ item.prepTime }} min</div>
                </div>
              </div>
              <div class="stat-item" *ngIf="item.calories">
                <mat-icon>local_fire_department</mat-icon>
                <div>
                  <div class="stat-label">Calories</div>
                  <div class="stat-value">{{ item.calories }} kcal</div>
                </div>
              </div>
              <div class="stat-item">
                <mat-icon>groups</mat-icon>
                <div>
                  <div class="stat-label">Serves</div>
                  <div class="stat-value">1 person</div>
                </div>
              </div>
            </div>

            <mat-divider class="divider"></mat-divider>

            <!-- Ingredients -->
            <div class="ingredients-section">
              <h3>Ingredients</h3>
              <div class="ingredient-chips">
                <mat-chip *ngFor="let ing of item.ingredients" class="ingredient-chip">{{ ing }}</mat-chip>
              </div>
            </div>

            <mat-divider class="divider"></mat-divider>

            <!-- Price & Cart CTA -->
            <div class="price-cta">
              <div class="price-section">
                <div class="current-price">₹{{ getDiscountedPrice() | number:'1.0-0' }}</div>
                <div class="original-price" *ngIf="item.discount && item.discount > 0">
                  <span class="old-price">₹{{ item.price }}</span>
                  <span class="savings">Save ₹{{ getSavings() | number:'1.0-0' }}</span>
                </div>
              </div>

              <div class="cta-buttons">
                <div class="quantity-control" *ngIf="cartService.isInCart(item.id)">
                  <button mat-mini-fab class="qty-btn minus" (click)="decreaseQty()" id="decrease-qty">
                    <mat-icon>remove</mat-icon>
                  </button>
                  <span class="qty-number">{{ cartService.getQuantity(item.id) }}</span>
                  <button mat-mini-fab class="qty-btn plus" (click)="addToCart()" id="increase-qty">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
                <button mat-raised-button class="add-cart-btn" *ngIf="!cartService.isInCart(item.id)"
                  (click)="addToCart()" id="add-to-cart">
                  <mat-icon>add_shopping_cart</mat-icon>
                  Add to Cart
                </button>
                <a routerLink="/cart" mat-stroked-button class="view-cart-btn" *ngIf="cartService.isInCart(item.id)" id="go-to-cart">
                  <mat-icon>shopping_cart</mat-icon>
                  View Cart ({{ cartService.totalItems() }})
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Items -->
        <div class="related-section" *ngIf="relatedItems.length > 0">
          <h2>You May Also Like</h2>
          <div class="related-grid">
            <a *ngFor="let related of relatedItems"
               [routerLink]="['/menu', related.id]"
               class="related-card">
              <img [src]="related.image" [alt]="related.name" class="related-img" loading="lazy">
              <div class="related-info">
                <div class="related-name">{{ related.name }}</div>
                <div class="related-price">₹{{ related.price }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <ng-template #notFound>
        <div class="not-found">
          <mat-icon>search_off</mat-icon>
          <h2>Item not found</h2>
          <a routerLink="/menu" mat-raised-button>Back to Menu</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .detail-page {
      min-height: 100vh;
      background: #0f0e17;
      padding: 100px 24px 60px;
    }

    .detail-container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .back-btn {
      color: rgba(255,255,255,0.7) !important;
      border-color: rgba(255,255,255,0.2) !important;
      margin-bottom: 32px;
      border-radius: 50px !important;

      &:hover { color: #fff !important; }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
      margin-bottom: 60px;
    }

    .detail-image-section { }

    .image-wrapper {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 1;
      box-shadow: 0 30px 80px rgba(0,0,0,0.6);
    }

    .detail-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%);
    }

    .detail-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .badge {
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .badge.veg { background: rgba(76,175,80,0.15); color: #4caf50; border: 1px solid rgba(76,175,80,0.3); .dot { background: #4caf50; } }
    .badge.nonveg { background: rgba(244,67,54,0.15); color: #f44336; border: 1px solid rgba(244,67,54,0.3); .dot { background: #f44336; } }
    .badge.recommended { background: rgba(245,166,35,0.15); color: #f5a623; border: 1px solid rgba(245,166,35,0.3); }
    .badge.discount { background: rgba(76,175,80,0.15); color: #4caf50; border: 1px solid rgba(76,175,80,0.3); }

    /* Info Section */
    .detail-info { color: white; }

    .info-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .category-tag {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #f5a623;
      font-weight: 600;
    }

    .rating-block {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star-icon {
      color: #f5a623;
      font-size: 1.1rem;
    }

    .rating {
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
    }

    .rating-label {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.4);
    }

    .item-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 16px;
      line-height: 1.2;
      color: #fff;
    }

    .item-description {
      color: rgba(255,255,255,0.6);
      line-height: 1.8;
      font-size: 0.95rem;
      margin-bottom: 24px;
    }

    .divider {
      border-color: rgba(255,255,255,0.08) !important;
      margin: 24px 0 !important;
    }

    /* Stats */
    .stats-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,0.7);

      mat-icon { color: #f5a623; }
    }

    .stat-label {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.4);
    }

    .stat-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: #fff;
    }

    /* Ingredients */
    .ingredients-section h3 {
      font-family: 'Playfair Display', serif;
      color: #fff;
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    .ingredient-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .ingredient-chip {
      background: rgba(255,255,255,0.07) !important;
      color: rgba(255,255,255,0.7) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
      border-radius: 50px !important;
    }

    /* Price & CTA */
    .price-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }

    .current-price {
      font-size: 2.2rem;
      font-weight: 800;
      color: #f5a623;
    }

    .original-price {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .old-price {
      font-size: 0.9rem;
      text-decoration: line-through;
      color: rgba(255,255,255,0.3);
    }

    .savings {
      font-size: 0.8rem;
      color: #4caf50;
      font-weight: 600;
    }

    .cta-buttons {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .add-cart-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 10px 24px !important;
      font-size: 0.95rem !important;
      box-shadow: 0 6px 20px rgba(245,166,35,0.4) !important;
    }

    .view-cart-btn {
      border-color: rgba(245,166,35,0.5) !important;
      color: #f5a623 !important;
      border-radius: 50px !important;
      padding: 10px 24px !important;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .qty-btn {
      width: 36px !important;
      height: 36px !important;
      min-width: 36px !important;
    }

    .qty-btn.minus { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
    .qty-btn.plus { background: linear-gradient(135deg, #f5a623, #e67e22) !important; color: #fff !important; }

    .qty-number {
      font-size: 1.4rem;
      font-weight: 700;
      min-width: 32px;
      text-align: center;
      color: #fff;
    }

    /* Related */
    .related-section {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 40px;
    }

    .related-section h2 {
      font-family: 'Playfair Display', serif;
      color: #fff;
      margin-bottom: 24px;
      font-size: 1.5rem;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }

    .related-card {
      text-decoration: none;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      transition: transform 0.3s;

      &:hover { transform: translateY(-4px); }
    }

    .related-img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }

    .related-info {
      padding: 10px 12px;
    }

    .related-name {
      color: rgba(255,255,255,0.8);
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .related-price {
      color: #f5a623;
      font-size: 0.9rem;
      font-weight: 700;
    }

    /* Not Found */
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      height: 50vh;
      color: rgba(255,255,255,0.5);
      text-align: center;

      mat-icon { font-size: 4rem; width: 4rem; height: 4rem; }
      h2 { color: #fff; font-family: 'Playfair Display', serif; }
    }

    @media (max-width: 768px) {
      .detail-grid { grid-template-columns: 1fr; gap: 32px; }
      .item-title { font-size: 1.8rem; }
    }
  `]
})
export class MenuDetailComponent implements OnInit {
  item: MenuItem | undefined;
  relatedItems: MenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
    public menuService: MenuService,
    public cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (this.menuService.menuItems().length === 0) {
        this.menuService.loadMenuItems().subscribe(() => {
          this.loadItem(id);
        });
      } else {
        this.loadItem(id);
      }
    });
  }

  loadItem(id: number): void {
    this.item = this.menuService.getMenuItemById(id);
    if (this.item) {
      this.relatedItems = this.menuService.menuItems()
        .filter(i => i.category === this.item!.category && i.id !== id)
        .slice(0, 4);
    }
  }

  addToCart(): void {
    if (this.item) {
      this.cartService.addItem(this.item);
      this.snackBar.open(`${this.item.name} added!`, '🛒', {
        duration: 2000, panelClass: ['success-snack'],
        horizontalPosition: 'end', verticalPosition: 'bottom'
      });
    }
  }

  decreaseQty(): void {
    if (this.item) {
      const q = this.cartService.getQuantity(this.item.id);
      this.cartService.updateQuantity(this.item.id, q - 1);
    }
  }

  getDiscountedPrice(): number {
    if (!this.item) return 0;
    return this.item.price * (1 - (this.item.discount || 0) / 100);
  }

  getSavings(): number {
    if (!this.item) return 0;
    return this.item.price * (this.item.discount || 0) / 100;
  }
}
