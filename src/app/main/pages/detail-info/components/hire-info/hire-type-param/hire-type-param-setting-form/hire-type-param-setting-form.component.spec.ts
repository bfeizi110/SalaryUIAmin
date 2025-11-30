import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeParamSettingFormComponent } from './hire-type-param-setting-form.component';

describe('HireTypeParamSettingFormComponent', () => {
  let component: HireTypeParamSettingFormComponent;
  let fixture: ComponentFixture<HireTypeParamSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeParamSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeParamSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
