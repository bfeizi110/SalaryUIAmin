import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignFileComponent } from './report-design-file.component';

describe('ReportDesignFileComponent', () => {
  let component: ReportDesignFileComponent;
  let fixture: ComponentFixture<ReportDesignFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
