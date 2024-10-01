import { CanActivateFn } from '@angular/router';

export const apiGuard: CanActivateFn = (route, state) => {
  return true;
};
