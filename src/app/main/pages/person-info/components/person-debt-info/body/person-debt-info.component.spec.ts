import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDebtInfoComponent } from './person-debt-info.component';

describe('PersonDebtInfoComponent', () => {
  let component: PersonDebtInfoComponent;
  let fixture: ComponentFixture<PersonDebtInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDebtInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDebtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
