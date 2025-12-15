import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategoryFormComponent } from './job-category-form.component';

describe('JobCategoryFormComponent', () => {
  let component: JobCategoryFormComponent;
  let fixture: ComponentFixture<JobCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
