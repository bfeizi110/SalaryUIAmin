import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaraeiSettingComponent } from './daraei-setting.component';

describe('DaraeiSettingComponent', () => {
  let component: DaraeiSettingComponent;
  let fixture: ComponentFixture<DaraeiSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaraeiSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaraeiSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
