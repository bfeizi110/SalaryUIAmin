import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMissionInfoDetailFormComponent } from './person-mission-info-detail-form.component';

describe('PersonMissionInfoDetailFormComponent', () => {
  let component: PersonMissionInfoDetailFormComponent;
  let fixture: ComponentFixture<PersonMissionInfoDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMissionInfoDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMissionInfoDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
