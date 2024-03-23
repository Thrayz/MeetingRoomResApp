import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.css']
})
export class ReservationUpdateComponent implements OnInit {
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
    private jwtService: JwtService,
    private route: ActivatedRoute
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

    const reservationId = this.route.snapshot.paramMap.get('id');
    if(reservationId) {
      this.reservationService.getReservation(reservationId).subscribe(
        (reservation: Reservation) => {
          const reservationDate = new Date(reservation.reservationDate);
          const reservationDateString = `${reservationDate.getFullYear()}-${('0' + (reservationDate.getMonth() + 1)).slice(-2)}-${('0' + reservationDate.getDate()).slice(-2)}T${('0' + reservationDate.getHours()).slice(-2)}:${('0' + reservationDate.getMinutes()).slice(-2)}`;
      
          const startTime = new Date(reservation.startTime);
          const startTimeString = `${('0' + startTime.getHours()).slice(-2)}:${('0' + startTime.getMinutes()).slice(-2)}`;
      
          const endTime = new Date(reservation.endTime);
          const endTimeString = `${('0' + endTime.getHours()).slice(-2)}:${('0' + endTime.getMinutes()).slice(-2)}`;
      
          this.reservationForm = this.formBuilder.group({
            _id: reservation._id,
            user: this.user.id,
            meetingRoom: reservation.meetingRoom, 
            reservationDate: [reservationDateString, [Validators.required]],
            startTime: startTimeString,
            endTime: endTimeString
          });
        },
        (error: any) => {
          console.error('Error fetching reservation:', error);
        }
      );
  }
  }

  updateReservation(): void {
    const reservation: Reservation = {
      ...this.reservationForm.value,
      reservationDate: this.reservationForm.value.reservationDate,
      startTime: this.extractTimeFromDate(new Date(this.reservationForm.value.reservationDate), this.reservationForm.value.startTime),
      endTime: this.extractTimeFromDate(new Date(this.reservationForm.value.reservationDate), this.reservationForm.value.endTime),
    };

    this.reservationService.updateReservation(reservation._id, reservation).subscribe(
      () => {
        this.router.navigate(['/reservations']);
      },
      (error: any) => {
        if (error.status === 409) {
          this.conflictError = 'There is a conflict with another reservation. Please select another date or time.';
        } else {
          console.error('Error updating reservation:', error);
        }
      }
    );
  }

  extractTimeFromDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  }
}