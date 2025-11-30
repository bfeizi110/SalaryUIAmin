import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeSettingFormComponent } from './hire-type-setting-form.component';

describe('HireTypeSettingFormComponent', () => {
  let component: HireTypeSettingFormComponent;
  let fixture: ComponentFixture<HireTypeSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
