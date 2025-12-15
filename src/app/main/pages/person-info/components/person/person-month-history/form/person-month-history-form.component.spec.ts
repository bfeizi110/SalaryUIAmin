import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthHistoryFormComponent } from './person-month-history-form.component';

describe('PersonMonthHistoryFormComponent', () => {
  let component: PersonMonthHistoryFormComponent;
  let fixture: ComponentFixture<PersonMonthHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthHistoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
