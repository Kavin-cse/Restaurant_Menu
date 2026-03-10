import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled">
      <div class="nav-container">
        <!-- Logo -->
        <a routerLink="/" class="logo">
          <div class="logo-icon">🍽️</div>
          <div class="logo-text">
            <span class="logo-main">Dhabi</span>
            <span class="logo-sub">Restaurant</span>
          </div>
        </a>

        <!-- Nav Links (Desktop) -->
        <nav class="nav-links">
          <a routerLink="/menu" routerLinkActive="active" class="nav-link">Menu</a>
          <a routerLink="/cart" routerLinkActive="active" class="nav-link">Cart</a>
          <a routerLink="/checkout" routerLinkActive="active" class="nav-link">Checkout</a>
        </nav>

        <!-- Actions -->
        <div class="nav-actions">
          <a routerLink="/cart" class="cart-btn" matRipple>
            <mat-icon [matBadge]="cartService.totalItems()" 
                      [matBadgeHidden]="cartService.isEmpty()"
                      matBadgeColor="warn">shopping_cart</mat-icon>
            <span class="cart-total" *ngIf="!cartService.isEmpty()">
              ₹{{ cartService.total() | number:'1.0-0' }}
            </span>
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle menu">
          <span [class.open]="isMobileMenuOpen"></span>
          <span [class.open]="isMobileMenuOpen"></span>
          <span [class.open]="isMobileMenuOpen"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <a routerLink="/menu" routerLinkActive="active" class="mobile-link" (click)="closeMobileMenu()">
          <mat-icon>restaurant_menu</mat-icon> Menu
        </a>
        <a routerLink="/cart" routerLinkActive="active" class="mobile-link" (click)="closeMobileMenu()">
          <mat-icon>shopping_cart</mat-icon> Cart 
          <span class="badge" *ngIf="!cartService.isEmpty()">{{ cartService.totalItems() }}</span>
        </a>
        <a routerLink="/checkout" routerLinkActive="active" class="mobile-link" (click)="closeMobileMenu()">
          <mat-icon>payment</mat-icon> Checkout
        </a>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 12px 0;
      background: rgba(15, 14, 23, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(15, 14, 23, 0.95);
      box-shadow: 0 4px 30px rgba(0,0,0,0.4);
      padding: 8px 0;
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .logo-icon {
      font-size: 1.8rem;
      line-height: 1;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .logo-main {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #fff;
    }

    .logo-sub {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #f5a623;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .nav-link {
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      color: rgba(255,255,255,0.75);
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
      letter-spacing: 0.3px;

      &:hover {
        color: #fff;
        background: rgba(255,255,255,0.08);
      }

      &.active {
        color: #f5a623;
        background: rgba(245, 166, 35, 0.12);
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cart-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 50px;
      background: linear-gradient(135deg, #f5a623, #e67e22);
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(245, 166, 35, 0.3);

      mat-icon {
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(245, 166, 35, 0.5);
      }
    }

    .cart-total {
      font-size: 0.85rem;
      font-weight: 700;
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      span.open:nth-child(2) { opacity: 0; }
      span.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    }

    .mobile-menu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease;
      background: rgba(15, 14, 23, 0.98);

      &.open {
        max-height: 300px;
      }
    }

    .mobile-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 24px;
      color: rgba(255,255,255,0.75);
      text-decoration: none;
      font-size: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      transition: all 0.2s;

      &:hover, &.active {
        color: #f5a623;
        background: rgba(245,166,35,0.08);
      }
    }

    .badge {
      background: #f5a623;
      color: #000;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-left: auto;
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .mobile-toggle { display: flex; }
      .cart-total { display: none; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
