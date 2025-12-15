import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCalcSettingFormComponent } from './salary-calc-setting-form.component';

describe('SalaryCalcSettingFormComponent', () => {
  let component: SalaryCalcSettingFormComponent;
  let fixture: ComponentFixture<SalaryCalcSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryCalcSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCalcSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
