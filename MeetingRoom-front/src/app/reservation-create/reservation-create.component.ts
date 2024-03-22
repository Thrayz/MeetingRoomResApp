import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/User';
import { JwtService } from '../services/jwt.service';



@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent implements OnInit {
  reservationForm!: FormGroup;
  meetingRooms: MeetingRoom[] = [];
  user:any;
  ConflictError: string = '';


  constructor(private reservationService: ReservationService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private meetingRoomService: MeetingRoomService,
    private jwtService: JwtService ) { }
    

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
    const currentDateTime = new Date().toISOString().substring(0, 16);
    this.reservationForm = this.formBuilder.group({
      _id: '',
      user: this.user.id,
      meetingRoom: '',
      reservationDate: currentDateTime,
      startTime: currentDateTime,
      endTime: currentDateTime
    });
  }

  submit(): void {
    const reservation: Reservation = this.reservationForm.value;
    this.createReservation(reservation);
  }

  createReservation(reservation: Reservation): void {
    this.reservationService.createReservation(reservation).subscribe(
      () => {
        this.router.navigate(['/reservations']);
      },
      (error: any) => {
        if (error.status === 409) {
          this.ConflictError = 'There is a conflict with another reservation. Please select another date or time.';
        }
        else {
        console.error('Error creating reservation:', error);
      }
    }
    );
  }
}