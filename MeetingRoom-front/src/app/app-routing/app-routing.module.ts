import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCreateComponent } from '../reservation-create/reservation-create.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { ReservationUpdateComponent } from '../reservation-update/reservation-update.component';
import { MeetingRoomCreateComponent } from '../meeting-room-create/meeting-room-create.component';
import { MeetingRoomsListComponent } from '../meeting-rooms-list/meeting-rooms-list.component';
import { MeetingRoomUpdateComponent } from '../meeting-room-update/meeting-room-update.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ReservationListUserComponent } from '../reservation-list-user/reservation-list-user.component';
import { MeetingRoomConsultComponent } from '../meeting-room-consult/meeting-room-consult.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { Error401Component } from '../errors/error401/error401.component';
import { Error403Component } from '../errors/error403/error403.component';
import { Error404Component } from '../errors/error404/error404.component';
import { RoleGuardService as RoleGuard } from '../services/role-guard.service';
import { ErrorComponent } from '../errors/error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'reservations/create', component: ReservationCreateComponent },
  { path: 'reservations/update/:id', component: ReservationUpdateComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservationsByUser', component: ReservationListUserComponent},
  { path: 'reservation-create/:id', component: ReservationCreateComponent },
  { 
    path: 'meeting-rooms/create', 
    component: MeetingRoomCreateComponent,
    canActivate: [RoleGuard], 
    data: { expectedRole: 'Admin' } 
  },
  { 
    path: 'meeting-rooms/update/:id', 
    component: MeetingRoomUpdateComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' }
  },
  { path: 'meeting-rooms', component: MeetingRoomsListComponent },
  { path: 'meeting-rooms/consult/:id', component: MeetingRoomConsultComponent},
  { path: '401', component: Error401Component },
  { path: '403', component: Error403Component },
  { path: '404', component: Error404Component },
  { path: 'error', component: ErrorComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/404', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
