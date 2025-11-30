import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignGridComponent } from './report-design-grid.component';

describe('ReportDesignGridComponent', () => {
  let component: ReportDesignGridComponent;
  let fixture: ComponentFixture<ReportDesignGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
