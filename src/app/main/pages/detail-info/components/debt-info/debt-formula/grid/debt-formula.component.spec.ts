import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtFormulaComponent } from './debt-formula.component';

describe('DebtFormulaComponent', () => {
  let component: DebtFormulaComponent;
  let fixture: ComponentFixture<DebtFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtFormulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
