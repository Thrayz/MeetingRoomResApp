import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomUpdateComponent } from './meeting-room-update.component';

describe('MeetingRoomUpdateComponent', () => {
  let component: MeetingRoomUpdateComponent;
  let fixture: ComponentFixture<MeetingRoomUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
