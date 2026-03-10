import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/models';
import { FilterMenuPipe } from '../../pipes/filter-menu.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatInputModule, MatFormFieldModule, MatSliderModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSelectModule,
    FilterMenuPipe, HighlightDirective
  ],
  template: `
    <section class="menu-section">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-badge">
          <mat-icon>restaurant_menu</mat-icon>
          <span>Our Menu</span>
        </div>
        <h2>Discover Our <span class="accent">Signature</span> Dishes</h2>
        <p>Hand-crafted with love, from the finest ingredients</p>
      </div>

      <!-- Filters Bar -->
      <div class="filters-bar">
        <!-- Search -->
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search dishes, ingredients...</mat-label>
          <input matInput [(ngModel)]="searchTerm" placeholder="e.g. Dosa, Rice..." id="menu-search">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <!-- Category Chips -->
        <div class="category-chips">
          <button
            *ngFor="let cat of menuService.categories"
            class="chip-btn"
            [class.active]="selectedCategory === cat.id"
            (click)="setCategory(cat.id)"
            [id]="'cat-' + cat.id">
            <mat-icon>{{ cat.icon }}</mat-icon>
            {{ cat.name }}
          </button>
        </div>

        <!-- Sort -->
        <mat-form-field appearance="outline" class="sort-field">
          <mat-label>Sort by</mat-label>
          <mat-select [(ngModel)]="sortBy" (selectionChange)="onSortChange()" id="sort-select">
            <mat-option value="default">Default</mat-option>
            <mat-option value="price-asc">Price: Low to High</mat-option>
            <mat-option value="price-desc">Price: High to Low</mat-option>
            <mat-option value="rating">Top Rated</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Loading -->
      <div class="loading-state" *ngIf="menuService.isLoading()">
        <mat-progress-spinner mode="indeterminate" diameter="48" color="accent"></mat-progress-spinner>
        <p>Loading delicious dishes...</p>
      </div>

      <!-- Error -->
      <div class="error-state" *ngIf="menuService.error()">
        <mat-icon>error_outline</mat-icon>
        <p>{{ menuService.error() }}</p>
        <button mat-raised-button (click)="loadMenu()" id="retry-btn">Retry</button>
      </div>

      <!-- Results Count -->
      <div class="results-info" *ngIf="!menuService.isLoading() && !menuService.error()">
        <span>Showing <strong>{{ filteredCount }}</strong> dishes</span>
        <span *ngIf="selectedCategory !== 'all'" class="active-filter">
          in <em>{{ getCategoryName(selectedCategory) }}</em>
          <button class="clear-filter" (click)="setCategory('all')" id="clear-filter-btn">✕</button>
        </span>
      </div>

      <!-- Menu Grid -->
      <div class="menu-grid" *ngIf="!menuService.isLoading() && !menuService.error()">
        <div
          *ngFor="let item of sortedItems | filterMenu:selectedCategory:0:searchTerm; let i = index"
          class="menu-card"
          appHighlight
          [isRecommended]="item.isRecommended || false"
          [discount]="item.discount || 0"
          [id]="'menu-item-' + item.id">

          <!-- Card Image -->
          <div class="card-image">
            <img [src]="item.image" [alt]="item.name" class="food-img" loading="lazy">
            <div class="card-overlay">
              <a [routerLink]="['/menu', item.id]" mat-mini-fab color="primary" class="view-btn" [id]="'view-' + item.id">
                <mat-icon>visibility</mat-icon>
              </a>
            </div>

            <!-- Badges -->
            <div class="badges">
              <span class="badge veg-badge" *ngIf="item.isVeg">
                <span class="dot"></span> Veg
              </span>
              <span class="badge nonveg-badge" *ngIf="!item.isVeg">
                <span class="dot"></span> Non-Veg
              </span>
              <span class="badge recommended-badge" *ngIf="item.isRecommended">⭐ Chef's Pick</span>
              <span class="badge discount-badge" *ngIf="item.discount && item.discount > 0">{{ item.discount }}% OFF</span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <div class="card-meta">
              <div class="card-category">{{ item.category | titlecase }}</div>
              <div class="card-rating">
                <mat-icon>star</mat-icon> {{ item.rating }}
              </div>
            </div>

            <h3 class="card-title">{{ item.name }}</h3>
            <p class="card-description">{{ item.description | slice:0:90 }}...</p>

            <div class="card-info">
              <span class="prep-time"><mat-icon>schedule</mat-icon> {{ item.prepTime }} min</span>
              <span class="calories" *ngIf="item.calories"><mat-icon>local_fire_department</mat-icon> {{ item.calories }} kcal</span>
            </div>

            <div class="card-footer">
              <div class="price-block">
                <span class="price">₹{{ getDiscountedPrice(item) | number:'1.0-0' }}</span>
                <span class="original-price" *ngIf="item.discount && item.discount > 0">₹{{ item.price }}</span>
              </div>

              <div class="quantity-control" *ngIf="cartService.isInCart(item.id); else addBtn">
                <button mat-mini-fab class="qty-btn minus" (click)="decreaseQty(item)" [id]="'minus-' + item.id">
                  <mat-icon>remove</mat-icon>
                </button>
                <span class="qty-num">{{ cartService.getQuantity(item.id) }}</span>
                <button mat-mini-fab class="qty-btn plus" (click)="addToCart(item)" [id]="'plus-' + item.id">
                  <mat-icon>add</mat-icon>
                </button>
              </div>

              <ng-template #addBtn>
                <button mat-raised-button class="add-btn" (click)="addToCart(item)" [id]="'add-' + item.id">
                  <mat-icon>add_shopping_cart</mat-icon>
                  Add
                </button>
              </ng-template>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="(sortedItems | filterMenu:selectedCategory:0:searchTerm).length === 0">
          <mat-icon>search_off</mat-icon>
          <h3>No dishes found</h3>
          <p>Try a different category or search term</p>
          <button mat-raised-button (click)="clearFilters()" id="clear-filters-btn">Clear Filters</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .menu-section {
      padding: 100px 24px 60px;
      background: #0f0e17;
      min-height: 80vh;
    }

    .section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 166, 35, 0.12);
      border: 1px solid rgba(245, 166, 35, 0.3);
      color: #f5a623;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 20px;

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3rem);
      color: white;
      margin: 0 0 12px;
      font-weight: 700;
    }

    .accent { color: #f5a623; }

    .section-header p {
      color: rgba(255,255,255,0.5);
      font-size: 1rem;
    }

    /* Filters */
    .filters-bar {
      max-width: 1280px;
      margin: 0 auto 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-start;
    }

    .search-field {
      flex: 1;
      min-width: 250px;
    }

    .search-field ::ng-deep .mat-mdc-text-field-wrapper {
      background: rgba(255,255,255,0.05) !important;
    }

    .search-field ::ng-deep .mat-mdc-form-field-outline-start,
    .search-field ::ng-deep .mat-mdc-form-field-outline-end,
    .search-field ::ng-deep .mat-mdc-form-field-outline-notch {
      border-color: rgba(255,255,255,0.15) !important;
    }

    .search-field ::ng-deep input, .search-field ::ng-deep label,
    .search-field ::ng-deep mat-icon {
      color: rgba(255,255,255,0.8) !important;
    }

    .sort-field {
      min-width: 180px;
    }

    .sort-field ::ng-deep .mat-mdc-text-field-wrapper {
      background: rgba(255,255,255,0.05) !important;
    }

    .sort-field ::ng-deep .mat-mdc-select-value-text,
    .sort-field ::ng-deep .mat-mdc-select-arrow,
    .sort-field ::ng-deep label {
      color: rgba(255,255,255,0.8) !important;
    }

    .sort-field ::ng-deep .mat-mdc-form-field-outline-start,
    .sort-field ::ng-deep .mat-mdc-form-field-outline-end,
    .sort-field ::ng-deep .mat-mdc-form-field-outline-notch {
      border-color: rgba(255,255,255,0.15) !important;
    }

    .category-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .chip-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }

      &:hover {
        background: rgba(255,255,255,0.1);
        color: #fff;
      }

      &.active {
        background: linear-gradient(135deg, #f5a623, #e67e22);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 4px 15px rgba(245,166,35,0.35);
      }
    }

    /* Results Info */
    .results-info {
      max-width: 1280px;
      margin: 0 auto 24px;
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;

      strong { color: #f5a623; }
      em { color: rgba(255,255,255,0.7); font-style: normal; }
    }

    .active-filter {
      margin-left: 6px;
    }

    .clear-filter {
      background: none;
      border: none;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      margin-left: 4px;
      font-size: 0.8rem;

      &:hover { color: #e74c3c; }
    }

    /* Loading / Error States */
    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 60px;
      color: rgba(255,255,255,0.6);

      mat-icon { font-size: 3rem; width: 3rem; height: 3rem; }
    }

    .error-state mat-icon { color: #e74c3c; }

    /* Menu Grid */
    .menu-grid {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 28px;
    }

    /* Menu Card */
    .menu-card {
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.35s ease, box-shadow 0.35s ease;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      }
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .food-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .menu-card:hover .food-img {
      transform: scale(1.08);
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .menu-card:hover .card-overlay {
      opacity: 1;
    }

    .view-btn {
      background: rgba(255,255,255,0.15) !important;
      backdrop-filter: blur(8px);
      color: #fff !important;
    }

    .badges {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .badge {
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 0.68rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      display: inline-block;
    }

    .veg-badge { background: rgba(76,175,80,0.9); color: #fff; .dot { background: #4caf50; } }
    .nonveg-badge { background: rgba(244,67,54,0.9); color: #fff; .dot { background: #f44336; } }
    .recommended-badge { background: rgba(245,166,35,0.9); color: #000; }
    .discount-badge { background: rgba(76,175,80,0.9); color: #fff; }

    /* Card Body */
    .card-body {
      padding: 18px 20px;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .card-category {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #f5a623;
      font-weight: 600;
    }

    .card-rating {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 0.82rem;
      color: #f5a623;
      font-weight: 600;

      mat-icon { font-size: 0.9rem; width: 0.9rem; height: 0.9rem; }
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #fff;
      margin: 0 0 8px;
      font-weight: 700;
    }

    .card-description {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.5);
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .card-info {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      color: rgba(255,255,255,0.4);
      font-size: 0.78rem;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      mat-icon { font-size: 0.85rem; width: 0.85rem; height: 0.85rem; }
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price-block {
      display: flex;
      flex-direction: column;
    }

    .price {
      font-size: 1.4rem;
      font-weight: 700;
      color: #f5a623;
    }

    .original-price {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
      text-decoration: line-through;
    }

    .add-btn {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      border-radius: 50px !important;
      padding: 6px 18px !important;
      font-size: 0.85rem !important;

      mat-icon { font-size: 1rem; margin-right: 4px; }
    }

    .quantity-control {
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

    .qty-btn.minus {
      background: rgba(255,255,255,0.08) !important;
      color: rgba(255,255,255,0.8) !important;
    }

    .qty-btn.plus {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
    }

    .qty-num {
      min-width: 24px;
      text-align: center;
      font-weight: 700;
      color: #fff;
      font-size: 1rem;
    }

    /* Empty State */
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px;
      color: rgba(255,255,255,0.5);

      mat-icon { font-size: 4rem; width: 4rem; height: 4rem; color: rgba(255,255,255,0.2); }
      h3 { color: rgba(255,255,255,0.7); font-family: 'Playfair Display', serif; }
    }

    @media (max-width: 600px) {
      .menu-section { padding: 80px 16px 40px; }
      .menu-grid { grid-template-columns: 1fr; }
      .filters-bar { flex-direction: column; }
    }
  `]
})
export class MenuListComponent implements OnInit {
  selectedCategory = 'all';
  searchTerm = '';
  sortBy = 'default';
  sortedItems: MenuItem[] = [];
  filteredCount = 0;

  constructor(
    public menuService: MenuService,
    public cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.menuService.loadMenuItems().subscribe({
      next: () => {
        this.sortedItems = [...this.menuService.menuItems()];
        this.filteredCount = this.sortedItems.length;
      }
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.updateFilteredCount();
  }

  onSortChange(): void {
    const items = [...this.menuService.menuItems()];
    switch (this.sortBy) {
      case 'price-asc': items.sort((a, b) => a.price - b.price); break;
      case 'price-desc': items.sort((a, b) => b.price - a.price); break;
      case 'rating': items.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    this.sortedItems = items;
  }

  updateFilteredCount(): void {
    const base = this.selectedCategory === 'all'
      ? this.menuService.menuItems()
      : this.menuService.menuItems().filter(i => i.category === this.selectedCategory);
    this.filteredCount = base.length;
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.sortBy = 'default';
    this.sortedItems = [...this.menuService.menuItems()];
    this.filteredCount = this.sortedItems.length;
  }

  addToCart(item: MenuItem): void {
    this.cartService.addItem(item);
    this.snackBar.open(`${item.name} added to cart!`, 'View Cart', {
      duration: 2500,
      panelClass: ['success-snack'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  decreaseQty(item: MenuItem): void {
    const q = this.cartService.getQuantity(item.id);
    this.cartService.updateQuantity(item.id, q - 1);
  }

  getDiscountedPrice(item: MenuItem): number {
    return item.price * (1 - (item.discount || 0) / 100);
  }

  getCategoryName(id: string): string {
    return this.menuService.categories.find(c => c.id === id)?.name || id;
  }
}
