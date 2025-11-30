import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingFiltersFormComponent } from './form-setting-filters-form.component';

describe('FormSettingFiltersFormComponent', () => {
  let component: FormSettingFiltersFormComponent;
  let fixture: ComponentFixture<FormSettingFiltersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSettingFiltersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSettingFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
