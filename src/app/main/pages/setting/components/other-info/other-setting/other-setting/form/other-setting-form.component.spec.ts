import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingFormComponent } from './other-setting-form.component';

describe('OtherSettingFormComponent', () => {
  let component: OtherSettingFormComponent;
  let fixture: ComponentFixture<OtherSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
