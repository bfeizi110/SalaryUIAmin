import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSettingComponent } from './hghlist-file-setting.component';

describe('HghlistFileSettingComponent', () => {
  let component: HghlistFileSettingComponent;
  let fixture: ComponentFixture<HghlistFileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
