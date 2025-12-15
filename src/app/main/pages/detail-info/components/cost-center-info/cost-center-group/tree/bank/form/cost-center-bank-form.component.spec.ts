import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterBankFormComponent } from './cost-center-bank-form.component';

describe('CostCenterBankFormComponent', () => {
  let component: CostCenterBankFormComponent;
  let fixture: ComponentFixture<CostCenterBankFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterBankFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterBankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
