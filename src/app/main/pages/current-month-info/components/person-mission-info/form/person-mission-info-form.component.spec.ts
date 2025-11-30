import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMissionInfoFormComponent } from './person-mission-info-form.component';

describe('PersonMissionInfoFormComponent', () => {
  let component: PersonMissionInfoFormComponent;
  let fixture: ComponentFixture<PersonMissionInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMissionInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMissionInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
