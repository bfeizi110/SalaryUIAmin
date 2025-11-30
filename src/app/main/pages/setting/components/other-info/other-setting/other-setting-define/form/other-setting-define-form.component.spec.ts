import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingDefineFormComponent } from './other-setting-define-form.component';

describe('OtherSettingDefineFormComponent', () => {
  let component: OtherSettingDefineFormComponent;
  let fixture: ComponentFixture<OtherSettingDefineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingDefineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingDefineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
