import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimulsoftViewerDashboardComponent } from './stimulsoft-viewer-dashboard.component';

describe('StimulsoftViewerDashboardComponent', () => {
  let component: StimulsoftViewerDashboardComponent;
  let fixture: ComponentFixture<StimulsoftViewerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StimulsoftViewerDashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulsoftViewerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
