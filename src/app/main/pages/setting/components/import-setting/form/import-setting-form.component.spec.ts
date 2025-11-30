import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSettingFormComponent } from './import-setting-form.component';

describe('ImportSettingFormComponent', () => {
  let component: ImportSettingFormComponent;
  let fixture: ComponentFixture<ImportSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportSettingFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
