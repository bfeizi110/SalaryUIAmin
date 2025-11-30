import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSettingGroupFormComponent } from './other-setting-group-form.component';

describe('OtherSettingGroupFormComponent', () => {
  let component: OtherSettingGroupFormComponent;
  let fixture: ComponentFixture<OtherSettingGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSettingGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSettingGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
