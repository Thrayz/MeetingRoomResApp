import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.router.navigate(['/401']);
    } else if (error.status === 403) {
      this.router.navigate(['/403']);
    } else if (error.status === 404) {
      this.router.navigate(['/404']);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
}
