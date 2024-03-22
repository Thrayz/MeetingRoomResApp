import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
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
}
