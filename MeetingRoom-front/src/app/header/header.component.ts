import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="header">
      <a *ngIf="authService.isAuthenticated()" routerLink="/">Home</a>
      <a *ngIf="authService.isAuthenticated()" routerLink="/reservationsByUser">Reservations</a>
      <a *ngIf="authService.isAuthenticated()" routerLink="/meeting-rooms">Meeting Rooms</a>
      <div class="spacer"></div>
      <a *ngIf="!authService.isAuthenticated()" routerLink="/login">Login</a>
      <a *ngIf="!authService.isAuthenticated()" routerLink="/register">Register</a>
      <a *ngIf="authService.isAuthenticated()" (click)="authService.logout()">Logout</a>
    </nav>
  `,
  styles: [`
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    position: relative; 
    z-index: 1000; 
    margin-bottom: 100px;
  }
  .header a {
    margin-right: 15px;
    color: #495057;
    text-decoration: none;
  }
  .header a:hover {
    color: #212529;
  }
  .spacer {
    flex: 1 1 auto;
  }
`]
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }
}