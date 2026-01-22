import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { MenuListComponent } from './menu-list/menu-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, MenuListComponent],
  template: `
    <header class="main-header">
      <div class="container header-content">
        <div class="logo">
           <!-- Simple Logo Placeholder -->
           <div class="logo-icon"></div>
           <span>Dhabi Restaurant</span>
        </div>
        <nav>
          <a href="#">Product</a>
          <a href="#">Recipe</a>
          <a href="#">About</a>
        </nav>
        <div class="header-actions">
           <button class="btn-special">Special Offer</button>
        </div>
      </div>
    </header>
    
    <main>
      <app-hero></app-hero>
      <app-menu-list></app-menu-list>
      
      <!-- Placeholder for Story/Chef if we had time to port them -->
    </main>
  `,
  styles: [`
    .main-header {
      padding: 15px 0;
      position: fixed; /* Fixed to stay on top */
      width: 100%;
      top: 0;
      z-index: 1000; /* Ensure high z-index */
      background: rgba(252, 249, 242, 0.85); /* Semi-transparent cream */
      backdrop-filter: blur(10px); /* Glassmorphism */
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1.2rem;
    }

    .logo-icon {
      width: 30px;
      height: 30px;
      background-color: #d35400;
      border-radius: 50%;
    }

    nav a {
      margin: 0 20px;
      text-decoration: none;
      color: #2c3e50;
      font-weight: 500;
    }

    .btn-special {
      background-color: #d35400;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  title = 'restaurant-app';
}
