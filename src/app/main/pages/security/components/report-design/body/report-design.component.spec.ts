import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignComponent } from './report-design.component';

describe('ReportDesignComponent', () => {
  let component: ReportDesignComponent;
  let fixture: ComponentFixture<ReportDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
