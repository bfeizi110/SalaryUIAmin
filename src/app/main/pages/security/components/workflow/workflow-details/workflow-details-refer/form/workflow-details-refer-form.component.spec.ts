import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailsReferFormComponent } from './workflow-details-refer-form.component';

describe('WorkFlowDetailsReferFormComponent', () => {
  let component: WorkFlowDetailsReferFormComponent;
  let fixture: ComponentFixture<WorkFlowDetailsReferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailsReferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailsReferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
