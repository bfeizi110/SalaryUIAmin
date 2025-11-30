import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterBankComponent } from './cost-center-bank.component';

describe('CostCenterBankComponent', () => {
  let component: CostCenterBankComponent;
  let fixture: ComponentFixture<CostCenterBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
