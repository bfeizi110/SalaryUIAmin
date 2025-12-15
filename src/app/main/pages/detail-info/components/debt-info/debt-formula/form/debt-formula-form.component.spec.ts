import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtFormulaFormComponent } from './debt-formula-form.component';

describe('DebtFormulaFormComponent', () => {
  let component: DebtFormulaFormComponent;
  let fixture: ComponentFixture<DebtFormulaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtFormulaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtFormulaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
