# 🍽️ Restaurant Menu & Ordering System

## Project Overview

Welcome to the **Dhabi Restaurant Application**! This is a production-ready, beautifully designed Angular 17 application for restaurant menu browsing and online ordering. The app features a stunning "3D Floating" design for a premium South Indian restaurant experience.

---

## 🎯 Key Features

### User Interface & Experience
- ✅ **Aesthetic Design**: Beautiful cream background (`#fcf9f2`) with a vibrant green primary theme (`#8dbf41`).
- ✅ **3D Floating Elements**: Global `float` animations for levitating elements across the screen.
- ✅ **Interactive Menu**: "Pop-out" menu cards positioned with depth to create a 3D effect.
- ✅ **Hero Section**: 3D Parallax Thali with floating ingredients and visual storytelling.
- ✅ **Cart & Ordering**: Seamless add-to-cart experience and interactive checkout flow.
- ✅ **Responsive Design**: Flawless display across mobile, tablet, and desktop views.

### Technical Excellence
- ✅ **Angular 17 Standalone Components**: Fully modern, module-less architecture.
- ✅ **Strict TypeScript**: 100% type coverage for robust safety.
- ✅ **Reactive State (Signals)**: Leveraging Angular Signals for optimal performance.
- ✅ **Service-based Architecture**: Clean separation of concerns with dependency injection.
- ✅ **RxJS Observables**: Advanced asynchronous data management.

---

## 📂 Project Structure

```text
restaurant-ordering/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero/                  - Parallax floating 3D landing section 
│   │   │   ├── menu-list/             - Browse & filter menu items
│   │   │   ├── menu-detail/           - View item details & add to cart
│   │   │   ├── cart/                  - Shopping cart with quantity controls
│   │   │   ├── order-form/            - Checkout form
│   │   │   └── order-confirmation/    - Order confirmation view
│   │   ├── services/                  - MenuService, CartService, OrderService
│   │   ├── models/                    - TypeScript interfaces
│   │   └── app.routes.ts              - Application routing configuration
│   └── main.ts                        - App bootstrap
├── public/
│   └── assets/
│       └── images/                    - Menu visual assets & 3D imagery
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup Steps
1. **Navigate to the core directory**:
   ```bash
   cd "c:\Users\kavin\Documents\Projects\RestaurantProject"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   ng serve --open
   # Or using npm
   npm run start
   ```
   The application will instantly orchestrate and open at `http://localhost:4200` in your default browser.

### Production Build
```bash
ng build
# Output will be generated in the /dist folder 
```

---

## 🎨 Application Architecture & Flow

### User Journey
1. **Landing & Hero View** → Engaging 3D layout, floating Thali showcasing the restaurant's signature style.
2. **Menu List** (`/menu`) → Browse dynamically loaded categories and beautifully stacked menu cards.
3. **Menu Details** (`/menu/:id`) → Dive into item ingredients, pricing, and dietary tags.
4. **Cart** (`/cart`) → Review orders, apply limits, update quantities.
5. **Checkout** (`/checkout`) → Capture dining requirements, payment methods, and finalize the order.
6. **Confirmation** (`/confirmation`) → Order receipt and tracking overview.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
##Screenshot
<img width="843" height="542" alt="menu4" src="https://github.com/user-attachments/assets/d0de534e-d05e-4cf0-9562-f45b0659845b" />
<img width="1628" height="967" alt="menu5" src="https://github.com/user-attachments/assets/2b7dba7a-3fe3-41a2-955e-cc2dcb670f31" />

<img width="852" height="517" alt="menu2" src="https://github.com/user-attachments/assets/93cb4e33-9616-4a6b-a8ed-d330ff46ec36" />
<im<img width="862" height="891" alt="menu1" src="https://github.com/user-attachments/assets/9e3fe175-181f-4093-8001-40f3f2d07fb5" /> width="807" height="518" alt="menu3" src="https://github.com/user-attachments/assets/52b02cb5-e53d-4e97-95d5-c3243949f01e" />


**Built with ❤️ using Angular 17 for a Premium Dining Experience**
