import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartFormComponent } from './org-chart-form.component';

describe('OrgChartFormComponent', () => {
  let component: OrgChartFormComponent;
  let fixture: ComponentFixture<OrgChartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgChartFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
