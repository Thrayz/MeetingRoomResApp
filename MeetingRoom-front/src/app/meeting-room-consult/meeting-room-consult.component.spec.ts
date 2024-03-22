import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomConsultComponent } from './meeting-room-consult.component';

describe('MeetingRoomConsultComponent', () => {
  let component: MeetingRoomConsultComponent;
  let fixture: ComponentFixture<MeetingRoomConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
