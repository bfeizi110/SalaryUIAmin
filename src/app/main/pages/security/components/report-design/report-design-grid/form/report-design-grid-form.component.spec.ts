import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignGridFormComponent } from './report-design-grid-form.component';

describe('ReportDesignGridFormComponent', () => {
  let component: ReportDesignGridFormComponent;
  let fixture: ComponentFixture<ReportDesignGridFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignGridFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignGridFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
