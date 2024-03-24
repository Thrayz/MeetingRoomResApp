import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/reservation.service';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-reservation-list-user',
  templateUrl: './reservation-list-user.component.html',
  styleUrls: ['./reservation-list-user.component.css']
})
export class ReservationListUserComponent implements OnInit {
  reservations: Reservation[] = [];
  userId!: string;
  meetingRooms: MeetingRoom[] = [];

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private meetingRoomService: MeetingRoomService
  ) { }

  ngOnInit(): void {
    this.meetingRoomService.getAllMeetingRooms().subscribe(
      (meetingRooms: MeetingRoom[]) => {
        this.meetingRooms = meetingRooms;
      },
      (error: any) => {
        console.error('Error fetching meeting rooms:', error);
      
      }
    );
    const token = localStorage.getItem('token');
    if (token) {
      this.userId = this.jwtService.decodeToken(token).id;
    }
    console.log('userId:', this.userId);
    this.fetchReservations();
  }

filter: { meetingRoomId?: string, date?: string } = {};
page = 1;
limit = 5;

filterReservations(meetingRoomId: string, date: string): void {
  const filter = {
    meetingRoomId: meetingRoomId || undefined,
    date: date || undefined
  };
  this.fetchReservations(filter);
}

fetchReservations(filter = {}, page = 1): void {
  console.log('filter:', filter);
  console.log('fetchReservations called with filter:', filter, 'and page:', page);

  this.reservationService.getReservationsByUserFilter(this.userId, filter, page, this.limit).subscribe(
    (data: any) => {
      this.reservations = data.reservations;
    },
    (error: any) => {
      console.error('Error fetching reservations:', error);
    }
  );
}

  addReservation(): void {
    this.router.navigate(['/reservations/create']);
  }

  updateReservation(reservationId: string): void {
    this.router.navigate(['/reservations/update', reservationId]);
  }

  deleteReservation(reservationId: string): void {
    this.reservationService.cancelReservation(reservationId).subscribe(
      () => {
        this.fetchReservations();
      },
      (error: any) => {
        console.error('Error deleting reservation:', error);
      }
    );
  }


  handleInput(event: Event, field: string): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter[field as keyof typeof this.filter] = value;
    this.fetchReservations(this.filter, this.page);
  }
}

