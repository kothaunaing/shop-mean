import { CanActivateFn, Router } from '@angular/router';
import Cookie from 'js-cookie';

export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = new Router();

  const token = Cookie.get('token');

  if (token) {
    router.navigate(['/']);
    return true;
  }
  return false;
};
