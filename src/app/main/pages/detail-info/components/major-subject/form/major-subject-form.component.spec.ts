import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorSubjectFormComponent } from './major-subject-form.component';

describe('MajorSubjectFormComponent', () => {
  let component: MajorSubjectFormComponent;
  let fixture: ComponentFixture<MajorSubjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorSubjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
