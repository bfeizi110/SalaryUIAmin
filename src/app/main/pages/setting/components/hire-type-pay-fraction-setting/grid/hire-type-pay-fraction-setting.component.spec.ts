import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypePayFractionSettingComponent } from './hire-type-pay-fraction-setting.component';

describe('HireTypePayFractionSettingComponent', () => {
  let component: HireTypePayFractionSettingComponent;
  let fixture: ComponentFixture<HireTypePayFractionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HireTypePayFractionSettingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypePayFractionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
