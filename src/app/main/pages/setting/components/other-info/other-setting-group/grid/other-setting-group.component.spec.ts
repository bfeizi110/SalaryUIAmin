import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingGroupComponent } from './other-setting-group.component';

describe('OtherSettingGroupComponent', () => {
  let component: OtherSettingGroupComponent;
  let fixture: ComponentFixture<OtherSettingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
