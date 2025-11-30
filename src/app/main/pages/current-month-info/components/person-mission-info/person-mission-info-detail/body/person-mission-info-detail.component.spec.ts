import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMissionInfoDetailComponent } from './person-mission-info-detail.component';

describe('PersonMissionInfoDetailComponent', () => {
  let component: PersonMissionInfoDetailComponent;
  let fixture: ComponentFixture<PersonMissionInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMissionInfoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMissionInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
