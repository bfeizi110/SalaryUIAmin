import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMissionInfoComponent } from './person-mission-info.component';

describe('PersonMissionInfoComponent', () => {
  let component: PersonMissionInfoComponent;
  let fixture: ComponentFixture<PersonMissionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMissionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
