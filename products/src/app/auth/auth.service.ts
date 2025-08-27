// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, data, { responseType: 'text' });
  }

logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
  getUsername(): string {
    const token = localStorage.getItem('accessToken');
    if (!token) return 'User';

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || decoded.username || 'User';
    } catch (e) {
      console.error('Invalid token', e);
      return 'User';
    }
  }
  getUserId(): number {
    const token = localStorage.getItem('accessToken');
    if (!token) return -1;

    try {
      const decoded: any = jwtDecode(token);

      return decoded.id ?? -1;
    } catch (e) {
      console.error('Invalid token', e);
      return -1;
    }
  }

refreshToken(refreshToken: string): Observable<{ accessToken: string}> {
  return this.http.post<{ accessToken: string }>(
    `${this.baseUrl}/refresh-token`,
    { refreshToken }
  );
}



}
