import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:3000/reservation';

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, reservation);
  }

  updateReservation(reservationId: string, reservation: Reservation): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${reservationId}`, reservation);
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${reservationId}`);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`);
  }

  getReservation(reservationId: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${reservationId}`);
  }

  getReservationsByUserFilter(userId: string, filter = {}, page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/${userId}`, {
      params: { ...filter, page, limit }
    });
  }

  getReservationsByMeetingRoom(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/meeting-room/${id}`).pipe(
      map((reservations: any[]) => reservations.map(reservation => {
        return {
          start: new Date(reservation.startTime),
          end: new Date(reservation.endTime),
          title: `${new Date(reservation.startTime).toLocaleTimeString()} - ${new Date(reservation.endTime).toLocaleTimeString()}`,
          color: 'red'
        };
      }))
    );
  }
}
