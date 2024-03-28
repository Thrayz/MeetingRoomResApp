import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MeetingRoom } from '../models/MeetingRoom';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  private baseUrl = 'http://localhost:3000/meetingRoom';
  //private baseUrl = 'https://mrra.onrender.com/meetingRoom';
  
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  private getHeaders() {
    let token = localStorage.getItem('token'); 
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return headers;
  }

  getAllMeetingRooms(): Observable<MeetingRoom[]> {
    return this.http.get<MeetingRoom[]>(`${this.baseUrl}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getMeetingRoomById(id: string): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  createMeetingRoom(meetingRoom: MeetingRoom): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, meetingRoom, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  updateMeetingRoom(id: string, meetingRoom: MeetingRoom): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, meetingRoom, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  deleteMeetingRoom(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  getMeetingRoomsPaginated(page = 1, limit = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/paginated`, {
      params: { page: page.toString(), limit: limit.toString() },
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  searchMeetingRoomsPaginated(searchTerm: string, page = 1, limit = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search`, {
      params: { searchTerm, page: page.toString(), limit: limit.toString() },
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }
}