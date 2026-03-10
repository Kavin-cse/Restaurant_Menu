import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <section class="hero-section">
      <!-- Animated Background Orbs -->
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>

      <div class="hero-container">
        <!-- Left: Text Content -->
        <div class="hero-content" data-aos="fade-right">
          <div class="hero-badge">
            <mat-icon>star</mat-icon>
            <span>Authentic South Indian Cuisine</span>
          </div>
          <h1 class="hero-headline">
            Experience the<br>
            <span class="gradient-text">True Flavors</span><br>
            of South India
          </h1>
          <p class="hero-description">
            From crispy dosas to aromatic biryanis — every dish crafted with 
            generations of culinary tradition and the finest local ingredients.
          </p>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">50+</span>
              <span class="stat-label">Menu Items</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">4.8★</span>
              <span class="stat-label">Avg Rating</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">20min</span>
              <span class="stat-label">Avg Prep</span>
            </div>
          </div>

          <div class="hero-cta">
            <a routerLink="/menu" mat-raised-button class="btn-primary">
              <mat-icon>restaurant_menu</mat-icon>
              Explore Menu
            </a>
            <a routerLink="/menu" mat-stroked-button class="btn-secondary">
              View Specials
            </a>
          </div>
        </div>

        <!-- Right: Visual -->
        <div class="hero-visual">
          <div class="plate-circle"></div>
          <div class="hero-image-container floating-element">
            <img 
              src="assets/images/masala dosa.jpeg" 
              alt="Signature South Indian Thali"
              class="hero-plate-img"
            >
          </div>
          <!-- Floating badges -->
          <div class="float-badge badge-1">
            <mat-icon>local_fire_department</mat-icon>
            <div>
              <div class="badge-title">Chef's Special</div>
              <div class="badge-sub">Chettinad Curry</div>
            </div>
          </div>
          <div class="float-badge badge-2">
            <mat-icon>eco</mat-icon>
            <div>
              <div class="badge-title">100% Fresh</div>
              <div class="badge-sub">Farm to Table</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-dot"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: linear-gradient(135deg, #0f0e17 0%, #1a1830 50%, #0d1b2a 100%);
      position: relative;
      overflow: hidden;
      padding-top: 80px;
    }

    .bg-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
      pointer-events: none;
    }

    .orb-1 {
      width: 600px; height: 600px;
      background: radial-gradient(circle, #f5a623, transparent);
      top: -200px; right: -100px;
    }

    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, #8dbf41, transparent);
      bottom: -100px; left: -100px;
    }

    .orb-3 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, #e74c3c, transparent);
      top: 40%; left: 40%;
    }

    .hero-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      z-index: 10;
      position: relative;
    }

    .hero-content {
      color: white;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(245, 166, 35, 0.15);
      border: 1px solid rgba(245, 166, 35, 0.3);
      color: #f5a623;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 24px;

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    .hero-headline {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 20px;
      color: #fff;
    }

    .gradient-text {
      background: linear-gradient(135deg, #f5a623, #e67e22);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.05rem;
      color: rgba(255,255,255,0.65);
      line-height: 1.7;
      margin-bottom: 36px;
      max-width: 420px;
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 36px;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
    }

    .stat-label {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.15);
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: linear-gradient(135deg, #f5a623, #e67e22) !important;
      color: white !important;
      padding: 12px 28px !important;
      border-radius: 50px !important;
      font-size: 0.95rem !important;
      font-weight: 600 !important;
      box-shadow: 0 8px 25px rgba(245, 166, 35, 0.4) !important;
      transition: all 0.3s !important;
      text-decoration: none !important;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(245, 166, 35, 0.6) !important;
      }
    }

    .btn-secondary {
      color: rgba(255,255,255,0.8) !important;
      border-color: rgba(255,255,255,0.25) !important;
      padding: 12px 28px !important;
      border-radius: 50px !important;
      font-size: 0.95rem !important;
      text-decoration: none !important;
      transition: all 0.3s !important;

      &:hover {
        border-color: rgba(255,255,255,0.5) !important;
        color: #fff !important;
      }
    }

    /* Right Visual */
    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 550px;
    }

    .plate-circle {
      position: absolute;
      width: 420px;
      height: 420px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%);
      border: 1px solid rgba(245,166,35,0.2);
    }

    .hero-image-container {
      width: 380px;
      height: 380px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid rgba(245,166,35,0.4);
      box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(245,166,35,0.1);
      position: relative;
      z-index: 2;
    }

    .hero-plate-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .float-badge {
      position: absolute;
      background: rgba(20, 20, 35, 0.85);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      z-index: 5;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      animation: floatBadge 4s ease-in-out infinite;

      mat-icon {
        color: #f5a623;
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .badge-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: #fff;
    }

    .badge-sub {
      font-size: 0.65rem;
      color: rgba(255,255,255,0.55);
    }

    .badge-1 {
      top: 80px;
      right: -10px;
      animation-delay: 0s;
    }

    .badge-2 {
      bottom: 80px;
      left: -10px;
      animation-delay: 2s;
    }

    @keyframes floatBadge {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: rgba(255,255,255,0.4);
      font-size: 0.7rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      animation: fadeInUp 2s ease infinite;
    }

    .scroll-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
    }

    @keyframes fadeInUp {
      0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
      50% { opacity: 1; transform: translateX(-50%) translateY(-5px); }
    }

    @media (max-width: 900px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
      }

      .hero-description, .hero-badge, .hero-stats {
        margin-left: auto;
        margin-right: auto;
      }

      .hero-cta {
        justify-content: center;
      }

      .hero-visual {
        height: 380px;
        order: -1;
      }

      .hero-image-container {
        width: 280px;
        height: 280px;
      }

      .plate-circle {
        width: 300px;
        height: 300px;
      }

      .badge-1 { right: 10px; }
      .badge-2 { left: 10px; }
    }
  `]
})
export class HeroComponent {}
