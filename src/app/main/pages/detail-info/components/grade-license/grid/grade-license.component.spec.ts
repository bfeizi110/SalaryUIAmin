import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeLicenseComponent } from './grade-license.component';

describe('GradeLicenseComponent', () => {
  let component: GradeLicenseComponent;
  let fixture: ComponentFixture<GradeLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
