import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/authenticate.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router);

  if (authService.isAdminAuthenticated()) {
    return true; // Permite acceso a /admin
  } else {
    router.navigate(['/admin-pin']); // Redirige a /admin-pin si no está autenticado
    return false; 
  }
};
