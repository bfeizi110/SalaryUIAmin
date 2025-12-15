import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSettingDetailFormComponent } from './import-setting-detail-form.component';

describe('ImportSettingDetailFormComponent', () => {
  let component: ImportSettingDetailFormComponent;
  let fixture: ComponentFixture<ImportSettingDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportSettingDetailFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSettingDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
