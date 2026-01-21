import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Vérifier si l'utilisateur est connecté ET admin
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true; // Accès autorisé
    }

    // Sinon, rediriger vers /login
    this.router.navigate(['/login']);
    return false; // Accès refusé
  }
}