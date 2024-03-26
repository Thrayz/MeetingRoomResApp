import { MeetingRoom } from './MeetingRoom';


export interface Reservation {
    _id: string;
    user: string;
    meetingRoom: MeetingRoom;
    reservationDate: Date;
    startTime: Date;
    endTime: Date;
  }
  