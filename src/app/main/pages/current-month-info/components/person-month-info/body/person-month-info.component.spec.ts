import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthInfoComponent } from './person-month-info.component';

describe('PersonMonthInfoComponent', () => {
  let component: PersonMonthInfoComponent;
  let fixture: ComponentFixture<PersonMonthInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
