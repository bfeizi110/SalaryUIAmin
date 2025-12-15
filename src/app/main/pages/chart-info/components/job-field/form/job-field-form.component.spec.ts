import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFieldFormComponent } from './job-field-form.component';

describe('JobFieldFormComponent', () => {
  let component: JobFieldFormComponent;
  let fixture: ComponentFixture<JobFieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFieldFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
