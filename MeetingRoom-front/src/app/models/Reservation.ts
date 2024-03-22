export interface Reservation {
    _id: string;
    user: string;
    meetingRoom: string;
    reservationDate: Date;
    startTime: Date;
    endTime: Date;
  }
  