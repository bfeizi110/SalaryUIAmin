import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthInfoFormComponent } from './person-month-info-form.component';

describe('PersonMonthInfoFormComponent', () => {
  let component: PersonMonthInfoFormComponent;
  let fixture: ComponentFixture<PersonMonthInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
