import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomCreateComponent } from './meeting-room-create.component';

describe('MeetingRoomCreateComponent', () => {
  let component: MeetingRoomCreateComponent;
  let fixture: ComponentFixture<MeetingRoomCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
