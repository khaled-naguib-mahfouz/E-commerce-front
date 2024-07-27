import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Save the attempted URL so we can redirect after login
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}