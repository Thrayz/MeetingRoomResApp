import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCreateComponent } from '../reservation-create/reservation-create.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { ReservationUpdateComponent } from '../reservation-update/reservation-update.component';
import { MeetingRoomCreateComponent } from '../meeting-room-create/meeting-room-create.component';
import { MeetingRoomsListComponent } from '../meeting-rooms-list/meeting-rooms-list.component';
import { MeetingRoomUpdateComponent } from '../meeting-room-update/meeting-room-update.component';

const routes: Routes = [
  { path: 'reservations/create', component: ReservationCreateComponent },
  { path: 'reservations/update/:id', component: ReservationUpdateComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'meeting-rooms/create', component: MeetingRoomCreateComponent },
  { path: 'meeting-rooms/update/:id', component: MeetingRoomUpdateComponent },
  { path: 'meeting-rooms', component: MeetingRoomsListComponent },
  { path: '', redirectTo: '/reservations', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/reservations', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
