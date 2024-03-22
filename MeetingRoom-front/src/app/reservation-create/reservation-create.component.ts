import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  reservationForm!: FormGroup;
  meetingRooms: MeetingRoom[] = [];
  user: any;
  conflictError: string = '';
  minDate!: string; 


  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private meetingRoomService: MeetingRoomService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = this.jwtService.decodeToken(token);
    }

    this.meetingRoomService.getAllMeetingRooms().subscribe(
      (meetingRooms: MeetingRoom[]) => {
        this.meetingRooms = meetingRooms;
      },
      (error: any) => {
        console.error('Error fetching meeting rooms:', error);
      }
    );

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    this.reservationForm = this.formBuilder.group({
      _id: '',
      user: this.user.id,
      meetingRoom: '',
      reservationDate: [this.minDate, [Validators.required]],
      startTime: '', 
      endTime: ''
    });
  }

  submit(): void {
    const reservation: Reservation = {
      ...this.reservationForm.value,
      reservationDate: this.reservationForm.value.reservationDate,
      startTime: this.extractTimeFromDate(new Date(this.reservationForm.value.reservationDate), this.reservationForm.value.startTime),
      endTime: this.extractTimeFromDate(new Date(this.reservationForm.value.reservationDate), this.reservationForm.value.endTime),
    };
    
    this.createReservation(reservation);
  }

  createReservation(reservation: Reservation): void {
    this.reservationService.createReservation(reservation).subscribe(
      () => {
        this.router.navigate(['/reservations']);
      },
      (error: any) => {
        if (error.status === 409) {
          this.conflictError = 'There is a conflict with another reservation. Please select another date or time.';
        } else {
          console.error('Error creating reservation:', error);
        }
      }
    );
  }

  extractTimeFromDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  }
}
