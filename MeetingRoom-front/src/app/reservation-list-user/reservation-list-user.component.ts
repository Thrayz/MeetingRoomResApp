import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/reservation.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-reservation-list-user',
  templateUrl: './reservation-list-user.component.html',
  styleUrls: ['./reservation-list-user.component.css']
})
export class ReservationListUserComponent implements OnInit {
  reservations: Reservation[] = [];
  userId!: string;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userId = this.jwtService.decodeToken(token).id;
    }
    console.log('userId:', this.userId);
    this.fetchReservations();
  }

filter: { meetingRoom?: string, date?: string, startTime?: string, endTime?: string } = {};
page = 1;
limit = 1;

fetchReservations(filter = {}, page = this.page): void {
  console.log('filter:', filter);
  console.log('fetchReservations called with filter:', filter, 'and page:', page);
  this.filter = filter;
  this.page = page;

  this.reservationService.getReservationsByUserFilter(this.userId, this.filter, this.page, this.limit).subscribe(
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
    this.reservationService. cancelReservation(reservationId).subscribe(
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

