import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignViewComponent } from './report-design-view.component';

describe('ReportDesignViewComponent', () => {
  let component: ReportDesignViewComponent;
  let fixture: ComponentFixture<ReportDesignViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
