import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsareh21SettingFormComponent } from './tabsareh21-setting-form.component';

describe('Tabsareh21SettingFormComponent', () => {
  let component: Tabsareh21SettingFormComponent;
  let fixture: ComponentFixture<Tabsareh21SettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsareh21SettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsareh21SettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
