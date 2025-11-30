import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHghWitnessComponent } from './person-hghwitness.component';

describe('PersonHghWitnessComponent', () => {
  let component: PersonHghWitnessComponent;
  let fixture: ComponentFixture<PersonHghWitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonHghWitnessComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHghWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
