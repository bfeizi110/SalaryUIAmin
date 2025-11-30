import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDebtInfoFormComponent } from './person-debt-info-form.component';

describe('PersonDebtInfoFormComponent', () => {
  let component: PersonDebtInfoFormComponent;
  let fixture: ComponentFixture<PersonDebtInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDebtInfoFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDebtInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
