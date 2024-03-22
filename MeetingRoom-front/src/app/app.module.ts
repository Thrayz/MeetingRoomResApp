import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';
import { MeetingRoomsListComponent } from './meeting-rooms-list/meeting-rooms-list.component';
import { MeetingRoomCreateComponent } from './meeting-room-create/meeting-room-create.component';
import { MeetingRoomUpdateComponent } from './meeting-room-update/meeting-room-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    ReservationCreateComponent,
    ReservationUpdateComponent,
    MeetingRoomsListComponent,
    MeetingRoomCreateComponent,
    MeetingRoomUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
