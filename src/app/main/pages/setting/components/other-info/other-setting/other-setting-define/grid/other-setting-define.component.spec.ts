import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingDefineComponent } from './other-setting-define.component';

describe('OtherSettingDefineComponent', () => {
  let component: OtherSettingDefineComponent;
  let fixture: ComponentFixture<OtherSettingDefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingDefineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
