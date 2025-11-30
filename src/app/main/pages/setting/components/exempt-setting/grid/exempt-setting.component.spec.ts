import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptSettingComponent } from './exempt-setting.component';

describe('ExemptSettingComponent', () => {
  let component: ExemptSettingComponent;
  let fixture: ComponentFixture<ExemptSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemptSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
