import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule here
import { AuthService } from './auth/auth.service';  // adjust path as needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],  // Add CommonModule here
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router,private authService: AuthService){}

  isAuthRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  getUsername(): string  {
return this.authService.getUsername();  
}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
