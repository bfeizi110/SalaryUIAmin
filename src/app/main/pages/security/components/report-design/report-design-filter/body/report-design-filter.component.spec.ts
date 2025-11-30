import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignFilterComponent } from './report-design-filter.component';

describe('ReportDesignFilterComponent', () => {
  let component: ReportDesignFilterComponent;
  let fixture: ComponentFixture<ReportDesignFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
