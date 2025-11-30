import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimulsoftViewerReportComponent } from './stimulsoft-viewer-report.component';

describe('StimulsoftViewerReportComponent', () => {
  let component: StimulsoftViewerReportComponent;
  let fixture: ComponentFixture<StimulsoftViewerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StimulsoftViewerReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulsoftViewerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
