import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  //private baseUrl = 'http://localhost:3000/reservation';
  private baseUrl = 'https://mrra.onrender.com/reservation';
  
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  private getHeaders() {
    let token = localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, reservation, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  updateReservation(reservationId: string, reservation: Reservation): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${reservationId}`, reservation, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${reservationId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getReservation(reservationId: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${reservationId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getReservationsByUserFilter(userId: string, filter = {}, page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/${userId}`, {
      params: { ...filter, page: page.toString(), limit: limit.toString() },
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getReservationsByMeetingRoom(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/meeting-room/${id}`, { headers: this.getHeaders() }).pipe(
      map((reservations: any[]) => reservations.map(reservation => {
        return {
          start: new Date(reservation.startTime),
          end: new Date(reservation.endTime),
          title: `${new Date(reservation.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(reservation.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          color: 'red'
        };
      })),
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }
}