import { Component, OnInit } from '@angular/core';
import { MeetingRoom } from '../models/MeetingRoom';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/Core';
import { ReservationService } from '../services/reservation.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import Tooltip from 'tooltip.js'; 
import * as $ from 'jquery';

@Component({
  selector: 'app-meeting-room-consult',
  templateUrl: './meeting-room-consult.component.html',
  styleUrls: ['./meeting-room-consult.component.css']
})
export class MeetingRoomConsultComponent implements OnInit {
  meetingRoom: MeetingRoom = {} as MeetingRoom;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    displayEventTime: false,
    eventMouseEnter: function(info) {
      let tooltip = new Tooltip(info.el, {
        title: info.event.title,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
      tooltip.show();
    },
    eventMouseLeave: function(info) {
      $('.tooltip').remove();
    }
  };
  constructor(private meetingRoomService: MeetingRoomService,
    private router: Router,
    private reservationService: ReservationService
    ) { }

  ngOnInit(): void {
    const meetingRoomId = this.router.url.split('/').pop();
    if(meetingRoomId) {
      this.meetingRoomService.getMeetingRoomById(meetingRoomId).subscribe(
        (meetingRoom: MeetingRoom) => {
          this.meetingRoom = meetingRoom;
          this.reservationService.getReservationsByMeetingRoom(meetingRoomId).subscribe(
            (events: any[]) => {
              this.calendarOptions.events = events;
            },
            (error: any) => {
              console.error('Error fetching reservations:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching meeting room:', error);
        }
      );
    }
  }
}