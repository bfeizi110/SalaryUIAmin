import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSettingFormComponent } from './hghlist-file-setting-form.component';

describe('HghlistFileSettingFormComponent', () => {
  let component: HghlistFileSettingFormComponent;
  let fixture: ComponentFixture<HghlistFileSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
