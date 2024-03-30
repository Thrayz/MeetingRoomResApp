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
  filter: { meetingRoomId?: string, date?: string, status?: string } = {};
  page = 1;
  limit = 5;
  totalPages = 0;
  today = new Date();

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
    
    this.fetchReservations();
    
  }


  //doesn't filter by date
  //fuck working with dates
  filterReservations(meetingRoomId: string, date: string): void {
    const filter = {
      meetingRoomId: meetingRoomId || '',
      date: date || undefined
    };
    this.fetchReservations(filter);
    console.log(filter);
  }

  filterReservationsByStatus(status: string): void {
    this.filter.status = status;
    this.fetchReservations(this.filter);
  }

  fetchReservations(filter = {}, page = 1): void {
    this.reservationService.getReservationsByUserFilter(this.userId, filter, page, this.limit).subscribe(
      (data: any) => {
        this.reservations = data.reservations;
        this.totalPages = data.totalPages;
        
      },
      (error: any) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchReservations(this.filter, this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchReservations(this.filter, this.page);
    }
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

  // looks like shit but it works for now so hey fuck it 
  handleInput(event: Event, field: string): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter[field as keyof typeof this.filter] = value;
    this.fetchReservations(this.filter, this.page);
  }
}
