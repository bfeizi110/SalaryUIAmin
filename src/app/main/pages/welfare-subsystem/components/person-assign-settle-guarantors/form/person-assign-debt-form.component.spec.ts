import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssignDebtFormComponent } from './person-assign-debt-form.component';

describe('PersonAssignDebtFormComponent', () => {
  let component: PersonAssignDebtFormComponent;
  let fixture: ComponentFixture<PersonAssignDebtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonAssignDebtFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssignDebtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
