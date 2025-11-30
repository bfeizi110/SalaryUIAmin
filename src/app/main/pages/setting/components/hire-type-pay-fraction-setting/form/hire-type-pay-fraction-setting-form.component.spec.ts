import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypePayFractionSettingFormComponent } from './hire-type-pay-fraction-setting-form.component';

describe('HireTypePayFractionSettingFormComponent', () => {
  let component: HireTypePayFractionSettingFormComponent;
  let fixture: ComponentFixture<HireTypePayFractionSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireTypePayFractionSettingFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypePayFractionSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
