import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);

  if (authService.currentUser?.role === 'admin') {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
