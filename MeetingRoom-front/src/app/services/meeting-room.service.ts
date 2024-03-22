import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeetingRoom } from '../models/MeetingRoom';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  private baseUrl = 'http://localhost:3000/meetingRoom';

  constructor(private http: HttpClient) { }

  getAllMeetingRooms(): Observable<MeetingRoom[]> {
    return this.http.get<MeetingRoom[]>(`${this.baseUrl}`);
  }

  getMeetingRoomById(id: string): Observable<MeetingRoom> {
    return this.http.get<MeetingRoom>(`${this.baseUrl}/${id}`);
  }

  createMeetingRoom(meetingRoom: MeetingRoom): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, meetingRoom);
  }

  updateMeetingRoom(id: string, meetingRoom: MeetingRoom): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, meetingRoom);
  }

  deleteMeetingRoom(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
