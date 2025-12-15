import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaraeiSettingFormComponent } from './daraei-setting-form.component';

describe('DaraeiSettingFormComponent', () => {
  let component: DaraeiSettingFormComponent;
  let fixture: ComponentFixture<DaraeiSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaraeiSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaraeiSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
