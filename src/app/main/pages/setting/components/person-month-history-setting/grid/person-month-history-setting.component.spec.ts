import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthHistorySettingComponent } from './person-month-history-setting.component';

describe('PersonMonthHistorySettingComponent', () => {
  let component: PersonMonthHistorySettingComponent;
  let fixture: ComponentFixture<PersonMonthHistorySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthHistorySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthHistorySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
