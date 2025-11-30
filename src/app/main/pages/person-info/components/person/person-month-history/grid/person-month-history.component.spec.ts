import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthHistoryComponent } from './person-month-history.component';

describe('PersonMonthHistoryComponent', () => {
  let component: PersonMonthHistoryComponent;
  let fixture: ComponentFixture<PersonMonthHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
