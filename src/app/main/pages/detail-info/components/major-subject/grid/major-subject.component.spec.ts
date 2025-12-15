import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorSubjectComponent } from './major-subject.component';

describe('MajorSubjectComponent', () => {
  let component: MajorSubjectComponent;
  let fixture: ComponentFixture<MajorSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
