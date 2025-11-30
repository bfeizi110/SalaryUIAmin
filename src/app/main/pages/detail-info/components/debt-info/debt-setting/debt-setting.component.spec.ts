import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtSettingComponent } from './debt-setting.component';

describe('DebtSettingComponent', () => {
  let component: DebtSettingComponent;
  let fixture: ComponentFixture<DebtSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
