import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthHistorySettingFormComponent } from './person-month-history-setting-form.component';

describe('PersonMonthHistorySettingFormComponent', () => {
  let component: PersonMonthHistorySettingFormComponent;
  let fixture: ComponentFixture<PersonMonthHistorySettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMonthHistorySettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthHistorySettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
