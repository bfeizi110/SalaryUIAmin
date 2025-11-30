import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureJobFormComponent } from './insure-job-form.component';

describe('InsureJobFormComponent', () => {
  let component: InsureJobFormComponent;
  let fixture: ComponentFixture<InsureJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsureJobFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
