import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service'; // decode token expiration

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('refreshToken');
    if (!token || this.jwtService.isTokenExpired(token)) {
      // Token missing or expired → force logout
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
