import { Component, OnInit } from '@angular/core';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';


@Component({
  selector: 'app-meeting-room-create',
  templateUrl: './meeting-room-create.component.html',
  styleUrls: ['./meeting-room-create.component.css']
})
export class MeetingRoomCreateComponent implements OnInit {
  meetingRoomForm!: FormGroup;
  user: any;

  constructor(private meetingRoomService: MeetingRoomService,
    private router: Router,
    private formBuilder: FormBuilder,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = this.jwtService.decodeToken(token);
    }

    this.meetingRoomForm = this.formBuilder.group({
      _id: '',
      name: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      equipments: this.formBuilder.array([]),
      availability: [true, [Validators.required]],
      user: this.user.id
    });

  }

  createMeetingRoom(): void {
    this.meetingRoomService.createMeetingRoom(this.meetingRoomForm.value).subscribe(
      (meetingRoom: MeetingRoom) => {
        console.log('Meeting Room created:', meetingRoom);
        this.router.navigate(['/meeting-rooms']);
      },
      (error: any) => {
        console.error('Error creating meeting room:', error);
      }
    );
  }

  addEquipment(): void {
    this.equipments.push(this.formBuilder.control(''));
  }
  
  removeEquipment(index: number): void {
    this.equipments.removeAt(index);
  }
  
  get equipments() {
    return this.meetingRoomForm.get('equipments') as FormArray;
  }



}
