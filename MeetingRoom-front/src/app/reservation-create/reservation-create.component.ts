import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router } from '@angular/router';
import { Reservation } from '../models/Reservation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';
import { json } from 'express';
import { ActivatedRoute } from '@angular/router';

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
  meetingRoomId: any;
  test: boolean = false;
  meetingRoom: MeetingRoom = {} as MeetingRoom;


  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private meetingRoomService: MeetingRoomService,
    private jwtService: JwtService,
    private route: ActivatedRoute
  ) { }

  //the most retarded shit I've wrote in a while
  //Looks like shit and might cause bugs in the future. Too bad
  //future me don't fucking touch this shit, please

  ngOnInit(): void {

    this.meetingRoomId = this.router.url.split('/').pop();
    console.log(this.meetingRoomId);
  
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
      meetingRoom: [null, [Validators.required]],
      reservationDate: [null, [Validators.required]],
      startTime: ['', [Validators.required]], 
      endTime: ['', [Validators.required]]
    });
    if (this.meetingRoomId && this.meetingRoomId !== 'create') {
      this.test = true;
      this.meetingRoomService.getMeetingRoomById(this.meetingRoomId).subscribe(
        (meetingRoom: MeetingRoom) => {
          this.meetingRoom = meetingRoom;
          this.reservationForm.patchValue({
            meetingRoom: this.meetingRoom._id
          });
        },
        (error: any) => {
          console.error('Error fetching meeting room:', error);
        }
      );
     
    }
  }

  submit(): void {
    const date = this.reservationForm.value.reservationDate.split('T')[0];
    if (isNaN(Date.parse(date))) {
      console.error('Invalid date:', date);
      return;
    }
    
    const reservation: Reservation = {
      ...this.reservationForm.value,
      reservationDate: new Date(date),
      startTime: this.createDate(date, this.reservationForm.value.startTime),
      endTime: this.createDate(date, this.reservationForm.value.endTime),
    };
    
    this.createReservation(reservation);
  }
  
  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
  
    return [year, month, day].join('-');
  }

  createReservation(reservation: Reservation): void {
    this.reservationService.createReservation(reservation).subscribe(
      () => {
        this.router.navigate(['/reservationsByUser']);
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

  extractTimeFromDate(date: string, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    let h = '' + hours;
    let m = '' + minutes;
  
    if (h.length < 2) 
      h = '0' + h;
    if (m.length < 2) 
      m = '0' + m;
  
    return [h, m].join(':');
  }

  createDate(date: string, time: string): Date {
    console.log(`Creating date with date=${date} and time=${time}`);
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  
}
