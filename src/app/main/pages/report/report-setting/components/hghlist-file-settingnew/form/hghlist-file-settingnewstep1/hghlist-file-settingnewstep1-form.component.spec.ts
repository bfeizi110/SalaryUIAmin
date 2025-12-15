import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghlistFileSettingNewStep1FormComponent } from './hghlist-file-settingnewstep1-form.component';

describe('HghlistFileSettingNewStep1FormComponent', () => {
  let component: HghlistFileSettingNewStep1FormComponent;
  let fixture: ComponentFixture<HghlistFileSettingNewStep1FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghlistFileSettingNewStep1FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghlistFileSettingNewStep1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
