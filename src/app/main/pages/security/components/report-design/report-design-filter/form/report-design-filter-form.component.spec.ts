import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignFilterFormComponent } from './report-design-filter-form.component';

describe('ReportDesignFilterFormComponent', () => {
  let component: ReportDesignFilterFormComponent;
  let fixture: ComponentFixture<ReportDesignFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
