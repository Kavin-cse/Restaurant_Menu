import { Routes } from '@angular/router';
import { cartGuard } from './guards/cart.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./components/menu-list/menu-list.component').then(m => m.MenuListComponent)
  },
  {
    path: 'menu/:id',
    loadComponent: () =>
      import('./components/menu-detail/menu-detail.component').then(m => m.MenuDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [cartGuard],
    loadComponent: () =>
      import('./components/order-form/order-form.component').then(m => m.OrderFormComponent)
  },
  {
    path: 'order-confirmation',
    loadComponent: () =>
      import('./components/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
