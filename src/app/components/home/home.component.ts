import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from '../hero/hero.component';
import { MenuListComponent } from '../menu-list/menu-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, HeroComponent, MenuListComponent],
  template: `
    <app-hero></app-hero>
    <app-menu-list></app-menu-list>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <div class="feature-card" *ngFor="let f of features">
          <div class="feature-icon">{{ f.emoji }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">🍽️ Dhabi Restaurant</div>
          <p>Authentic South Indian flavors, delivered with love since 2020.</p>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <a routerLink="/menu">Menu</a>
          <a routerLink="/cart">Cart</a>
          <a routerLink="/checkout">Checkout</a>
        </div>
        <div class="footer-contact">
          <h4>Contact</h4>
          <p>📍 123 MG Road, Chennai, TN 600001</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@dhabirestaurant.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Dhabi Restaurant. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .features-section {
      background: #0f0e17;
      padding: 60px 24px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .features-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
    }

    .feature-card {
      text-align: center;
      padding: 32px 24px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      transition: transform 0.3s, border-color 0.3s;

      &:hover {
        transform: translateY(-4px);
        border-color: rgba(245,166,35,0.2);
      }
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-family: 'Playfair Display', serif;
      color: #fff;
      margin: 0 0 10px;
      font-size: 1.1rem;
    }

    .feature-card p {
      color: rgba(255,255,255,0.45);
      font-size: 0.85rem;
      line-height: 1.6;
      margin: 0;
    }

    /* Footer */
    .footer {
      background: #0a0914;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 60px 24px 20px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #fff;
      margin-bottom: 12px;
    }

    .footer-brand p {
      color: rgba(255,255,255,0.4);
      font-size: 0.85rem;
      line-height: 1.6;
      margin: 0;
    }

    .footer-links h4, .footer-contact h4 {
      color: #f5a623;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }

    .footer-links a {
      display: block;
      color: rgba(255,255,255,0.45);
      text-decoration: none;
      font-size: 0.9rem;
      margin-bottom: 8px;
      transition: color 0.2s;

      &:hover { color: #f5a623; }
    }

    .footer-contact p {
      color: rgba(255,255,255,0.45);
      font-size: 0.85rem;
      margin-bottom: 8px;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 20px;
      text-align: center;
      color: rgba(255,255,255,0.25);
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .footer-content { grid-template-columns: 1fr; gap: 24px; }
    }
  `]
})
export class HomeComponent {
  features = [
    { emoji: '🌿', title: 'Fresh Ingredients', desc: 'All dishes prepared daily with farm-fresh, locally sourced ingredients.' },
    { emoji: '⚡', title: 'Quick Service', desc: 'Most dishes ready in under 20 minutes — freshness you can taste.' },
    { emoji: '🏺', title: 'Traditional Recipes', desc: 'Authentic recipes passed down through generations of South Indian cooking.' },
    { emoji: '🛵', title: 'Free Delivery', desc: 'Complimentary delivery on all orders. Hot food to your doorstep.' },
  ];
}
