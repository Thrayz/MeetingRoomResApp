import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

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
    return localStorage.getItem('role') === 'admin';
  }
  isUser(): boolean {
    return localStorage.getItem('role') === 'user';
  }
}
