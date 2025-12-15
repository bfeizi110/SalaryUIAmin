import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingsFormComponent } from './form-settings-form.component';

describe('EntityPropertyFormComponent', () => {
  let component: FormSettingsFormComponent;
  let fixture: ComponentFixture<FormSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSettingsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
