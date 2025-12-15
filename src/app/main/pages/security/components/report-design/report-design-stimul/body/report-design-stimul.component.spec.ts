import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignStimulComponent } from './report-design-stimul.component';

describe('ReportDesignStimulComponent', () => {
  let component: ReportDesignStimulComponent;
  let fixture: ComponentFixture<ReportDesignStimulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignStimulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignStimulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
