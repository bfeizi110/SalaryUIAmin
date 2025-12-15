import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSettingNewStep2FormComponent } from './hghlist-file-settingnewstep2-form.component';

describe('HghlistFileSettingNewStep2FormComponent', () => {
  let component: HghlistFileSettingNewStep2FormComponent;
  let fixture: ComponentFixture<HghlistFileSettingNewStep2FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSettingNewStep2FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSettingNewStep2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
