import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  //private baseUrl = 'https://mrra.onrender.com/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { name, email, password, role });
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
    

  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwtDecode(token) as { role: string }; 

    return decoded.role === 'Admin';
  }

  isUser(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwtDecode(token) as { role: string }; 

    return decoded.role === 'User';
  } 

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const decoded = jwtDecode(token) as { role: string }; 

    return decoded.role;
  }
}
