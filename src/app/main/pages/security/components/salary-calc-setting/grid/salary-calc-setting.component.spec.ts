import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalcSettingComponent } from './salary-calc-setting.component';

describe('SalaryCalcSettingComponent', () => {
  let component: SalaryCalcSettingComponent;
  let fixture: ComponentFixture<SalaryCalcSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryCalcSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCalcSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
