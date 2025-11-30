import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignStimulFormComponent } from './report-design-stimul-form.component';

describe('ReportDesignStimulFormComponent', () => {
  let component: ReportDesignStimulFormComponent;
  let fixture: ComponentFixture<ReportDesignStimulFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignStimulFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignStimulFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
