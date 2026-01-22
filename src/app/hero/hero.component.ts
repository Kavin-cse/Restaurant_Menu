import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="container hero-container">
        <!-- Text Content -->
        <div class="hero-content">
          <h2 class="sub-headline">Welcome to Dhabi</h2>
          <h1 class="headline">All Delicious<br><span class="highlight">South Indian</span></h1>
          <p class="hero-text">Eggs, Salad, fruits, pasta & authentic spices.</p>
          <button class="btn-primary">Find for more</button>
        </div>

        <!-- Visual Content -->
        <div class="hero-visual">
          <div class="plate-wrapper floating-element">
            <img src="assets/images/hero-thali.png" alt="South Indian Thali" class="main-plate">
          </div>
          
          <!-- Decorative Floating Ingredients (Simulated Parallax) -->
          <img src="assets/images/sambar.png" class="floating-deco deco-1" alt="Sambar">
          <img src="assets/images/vada.png" class="floating-deco deco-2" alt="Vada">
          <!-- We reuse existing assets as decorative elements for now -->
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 80vh;
      display: flex;
      align-items: center;
      position: relative;
    }
    
    .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
      width: 100%;
    }

    .hero-content {
      z-index: 10;
    }

    .sub-headline {
      color: #d35400; /* Burnt orange accent? Or stick to green? User asked for green primary. Let's use darker green or orange for sub. */
      color: var(--primary-green);
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }

    .headline {
      font-size: 4rem;
      line-height: 1.1;
      margin-bottom: 20px;
      color: #2c3e50;
      
      .highlight {
        color: var(--primary-green);
      }
    }

    .hero-text {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin-bottom: 30px;
    }

    .btn-primary {
      background-color: #8dbf41; /* Green */
      color: white; /* Green text on cream? No, white text on green usually better. User said primary is green.*/
      border: none;
      padding: 15px 35px;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(141, 191, 65, 0.3);
      transition: transform 0.3s;
      
      &:hover {
        transform: translateY(-3px);
      }
    }

    .hero-visual {
      position: relative;
      height: 600px; /* Give space for floating */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .plate-wrapper {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 550px;
    }

    .main-plate {
      width: 100%;
      filter: drop-shadow(0 30px 60px rgba(0,0,0,0.2));
      mix-blend-mode: screen; /* Attempt to remove black background */
    }

    .floating-deco {
      position: absolute;
      z-index: 4;
      opacity: 0.8;
      pointer-events: none;
    }

    .deco-1 {
      top: 10%;
      right: 0%;
      width: 150px;
      animation: float 7s ease-in-out infinite reverse;
    }

    .deco-2 {
      bottom: 10%;
      left: 0%;
      width: 120px;
      animation: float 8s ease-in-out infinite 1s;
    }

    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-visual {
        min-height: 400px;
        order: -1;
      }
    }
  `]
})
export class HeroComponent { }
