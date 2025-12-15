import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParameterDetailFormComponent } from './report-parameter-detail-form.component';

describe('ReportParameterDetailFormComponent', () => {
  let component: ReportParameterDetailFormComponent;
  let fixture: ComponentFixture<ReportParameterDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportParameterDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParameterDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
