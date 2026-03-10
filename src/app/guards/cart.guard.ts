import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CartService } from '../services/cart.service';

export const cartGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.isEmpty()) {
    router.navigate(['/cart']);
    return false;
  }
  return true;
};
