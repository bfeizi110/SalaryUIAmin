import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StimulsoftViewerReportRendererComponent } from './stimulsoft-viewer-report-renderer.component';


describe('StimulsoftViewerReportRendererComponent', () => {
  let component: StimulsoftViewerReportRendererComponent;
  let fixture: ComponentFixture<StimulsoftViewerReportRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StimulsoftViewerReportRendererComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulsoftViewerReportRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
