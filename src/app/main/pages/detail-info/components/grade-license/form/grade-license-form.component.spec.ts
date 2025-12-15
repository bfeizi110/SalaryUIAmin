import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeLicenseFormComponent } from './grade-license-form.component';

describe('GradeLicenseFormComponent', () => {
  let component: GradeLicenseFormComponent;
  let fixture: ComponentFixture<GradeLicenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeLicenseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeLicenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
