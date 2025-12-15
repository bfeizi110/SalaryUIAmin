import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHghWitnessFormComponent } from './person-hghwitness-form.component';

describe('PersonDebtInfoFormComponent', () => {
  let component: PersonHghWitnessFormComponent;
  let fixture: ComponentFixture<PersonHghWitnessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonHghWitnessFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHghWitnessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
