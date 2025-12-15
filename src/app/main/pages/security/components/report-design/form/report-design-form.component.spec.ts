import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDesignFormComponent } from './report-design-form.component';

describe('ReportDesignFormComponent', () => {
  let component: ReportDesignFormComponent;
  let fixture: ComponentFixture<ReportDesignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDesignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDesignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
