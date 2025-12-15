import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsareh21SettingComponent } from './tabsareh21-setting.component';

describe('Tabsareh21SettingComponent', () => {
  let component: Tabsareh21SettingComponent;
  let fixture: ComponentFixture<Tabsareh21SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsareh21SettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsareh21SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
