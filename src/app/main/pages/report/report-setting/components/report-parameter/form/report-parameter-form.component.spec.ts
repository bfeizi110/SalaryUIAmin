import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParameterFormComponent } from './report-parameter-form.component';

describe('ReportParameterFormComponent', () => {
  let component: ReportParameterFormComponent;
  let fixture: ComponentFixture<ReportParameterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportParameterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParameterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
