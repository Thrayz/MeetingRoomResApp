import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomsListComponent } from './meeting-rooms-list.component';

describe('MeetingRoomsListComponent', () => {
  let component: MeetingRoomsListComponent;
  let fixture: ComponentFixture<MeetingRoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRoomsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
