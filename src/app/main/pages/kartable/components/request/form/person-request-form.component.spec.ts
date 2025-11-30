import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHghWitnessRequestFormComponent } from './person-hghwitness-request-form.component';

describe('PersonHghWitnessRequestFormComponent', () => {
  let component: PersonHghWitnessRequestFormComponent;
  let fixture: ComponentFixture<PersonHghWitnessRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonHghWitnessRequestFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHghWitnessRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
