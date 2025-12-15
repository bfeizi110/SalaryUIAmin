import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParameterDetailComponent } from './report-parameter-detail.component';

describe('ReportParameterDetailComponent', () => {
  let component: ReportParameterDetailComponent;
  let fixture: ComponentFixture<ReportParameterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportParameterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParameterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
