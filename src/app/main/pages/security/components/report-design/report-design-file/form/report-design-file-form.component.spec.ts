import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignFileFormComponent } from './report-design-file-form.component';

describe('ReportDesignFileFormComponent', () => {
  let component: ReportDesignFileFormComponent;
  let fixture: ComponentFixture<ReportDesignFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignFileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
