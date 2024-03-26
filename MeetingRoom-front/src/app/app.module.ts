import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppComponent } from './app.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';
import { MeetingRoomsListComponent } from './meeting-rooms-list/meeting-rooms-list.component';
import { MeetingRoomCreateComponent } from './meeting-room-create/meeting-room-create.component';
import { MeetingRoomUpdateComponent } from './meeting-room-update/meeting-room-update.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReservationListUserComponent } from './reservation-list-user/reservation-list-user.component';
import { MeetingRoomConsultComponent } from './meeting-room-consult/meeting-room-consult.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    ReservationCreateComponent,
    ReservationUpdateComponent,
    MeetingRoomsListComponent,
    MeetingRoomCreateComponent,
    MeetingRoomUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ReservationListUserComponent,
    MeetingRoomConsultComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
