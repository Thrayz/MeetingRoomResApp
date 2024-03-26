import { Component, OnInit } from '@angular/core';
import { MeetingRoomService } from '../services/meeting-room.service';
import { MeetingRoom } from '../models/MeetingRoom';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-meeting-room-update',
  templateUrl: './meeting-room-update.component.html',
  styleUrls: ['./meeting-room-update.component.css']
})
export class MeetingRoomUpdateComponent implements OnInit {
  meetingRoomForm!: FormGroup;
  user: any;
  id?: string;

  constructor(private meetingRoomService: MeetingRoomService,
    private router: Router,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = this.jwtService.decodeToken(token);
    }

    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.meetingRoomService.getMeetingRoomById(this.id).subscribe((meetingRoom: MeetingRoom) => {
      this.meetingRoomForm = this.formBuilder.group({
        _id: meetingRoom._id,
        name: [meetingRoom.name, [Validators.required]],
        capacity: [meetingRoom.capacity, [Validators.required]],
        equipments: this.formBuilder.array(meetingRoom.equipments || []),
        availability: [meetingRoom.availability, [Validators.required]],
        user: this.user.id
      });
    });
  }

  updateMeetingRoom(): void {
    if (this.id) {
      this.meetingRoomService.updateMeetingRoom(this.id, this.meetingRoomForm.value).subscribe(
        () => {
          console.log('Meeting Room updated');
          this.router.navigate(['/meeting-rooms']);
        },
        (error: any) => {
          console.error('Error updating meeting room:', error);
        }
      );
    }
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