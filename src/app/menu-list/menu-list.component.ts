import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, MenuItem } from '../menu.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="menu-section">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Our Delicious and Special Salad <span class="highlight">Indian</span></h2>
          <p class="subtitle">Food is any substance consumed by an organism for nutritional support.</p>
        </div>

        <div class="menu-grid">
          <div *ngFor="let item of items" class="menu-card">
            <div class="card-image-wrapper">
              <img [src]="item.image" [alt]="item.name" class="card-img" 
                   [ngClass]="{
                     'blend-screen': item.image.startsWith('assets'), 
                     'circle-crop': !item.image.startsWith('assets') 
                   }" />
              <div class="price-tag">\${{item.price}}</div>
            </div>
            <div class="card-content">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .menu-section {
      padding: 100px 0;
    }

    .text-center { text-align: center; }
    .mb-5 { margin-bottom: 3rem; }

    .section-title {
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .highlight { color: #d35400; /* Or brown/gold as per image? */ }
    
    .subtitle { color: #95a5a6; }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 60px 30px; /* Large row gap for pop-out images */
      padding-top: 50px; /* Space for top overflowing images */
    }

    .menu-card {
      background: #fff;
      border-radius: 30px 30px 0 0; /* User requested top border radius 30px. Maybe bottom too? Let's do all-around or just top as requested. */
      /* "Cards must be white with a top border-radius of 30px." - implies simpler bottom or uniform. 
         Usually modern cards are uniform. I'll do uniform 30px for better look given the floating style. */
      border-radius: 30px; 
      padding: 120px 20px 30px 20px; /* Huge top padding to clear the image */
      position: relative;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.05);
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-10px);
      }
    }

    .card-image-wrapper {
      position: absolute;
      top: -60px; /* Pop out of top */
      left: 50%;
      transform: translateX(-50%);
      width: 180px;
      height: 180px;
    }

    .card-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 15px 25px rgba(0,0,0,0.2)); /* Shadow for depth */
      transition: transform 0.4s;
    }

    .blend-screen {
      mix-blend-mode: screen; /* For black bg images */
    }

    .circle-crop {
      border-radius: 50%;
      object-fit: cover !important; /* Force cover for photos */
      border: 3px solid #fff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .menu-card:hover .card-img {
      transform: scale(1.1) rotate(5deg);
    }

    .price-tag {
      position: absolute;
      top: 10px;
      left: 0px; /* As per image design, often price is a badge near image */
      background-color: #000;
      color: #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
      z-index: 2;
    }

    .card-content h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: #2c3e50;
    }

    .card-content p {
      font-size: 0.9rem;
      color: #95a5a6;
      line-height: 1.6;
    }
  `]
})
export class MenuListComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.items = this.menuService.getMenuItems();
  }
}
