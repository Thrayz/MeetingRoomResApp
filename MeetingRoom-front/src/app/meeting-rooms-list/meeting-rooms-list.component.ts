import { Component, OnInit } from '@angular/core';
import { MeetingRoom } from '../models/MeetingRoom';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-meeting-rooms-list',
  templateUrl: './meeting-rooms-list.component.html',
  styleUrls: ['./meeting-rooms-list.component.css']
})
export class MeetingRoomsListComponent implements OnInit {
  meetingRooms: MeetingRoom[] = [];


  constructor(private meetingRoomService: MeetingRoomService,
    private router: Router

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
  }

  addMeetingRoom(): void {
    this.router.navigate(['/meeting-rooms/create']);
  }

  updateMeetingRoom(meetingRoomId: string): void {
    this.router.navigate(['/meeting-rooms/update', meetingRoomId]);
  }

  deleteMeetingRoom(meetingRoomId: string): void {
    this.meetingRoomService.deleteMeetingRoom(meetingRoomId).subscribe(
      () => {
        this.meetingRoomService.getAllMeetingRooms().subscribe(
          (meetingRooms: MeetingRoom[]) => {
            this.meetingRooms = meetingRooms;
          },
          (error: any) => {
            console.error('Error fetching meeting rooms:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error deleting meeting room:', error);
      }
    );
  }

  consultRoom(meetingRoomId: string): void {
    this.router.navigate(['/meeting-rooms/consult', meetingRoomId]);
  }


}
