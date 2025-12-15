import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingFiltersComponent } from './form-setting-filters.component';

describe('FormSettingFiltersComponent', () => {
  let component: FormSettingFiltersComponent;
  let fixture: ComponentFixture<FormSettingFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSettingFiltersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSettingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
