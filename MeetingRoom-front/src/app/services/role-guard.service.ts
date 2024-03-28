import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; 

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = 'Admin';
    const currentRole = this.auth.getRole(); 

    if (!this.auth.isAuthenticated() || currentRole !== expectedRole) {
      this.router.navigate(['/403']);
      return false;
    }
    return true;
  }
}