import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptSettingFormComponent } from './exempt-setting-form.component';

describe('ExemptSettingFormComponent', () => {
  let component: ExemptSettingFormComponent;
  let fixture: ComponentFixture<ExemptSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemptSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
