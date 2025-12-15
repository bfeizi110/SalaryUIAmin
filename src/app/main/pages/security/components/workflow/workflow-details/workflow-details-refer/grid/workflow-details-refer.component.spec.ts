import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailsReferComponent } from './workflow-details-refer.component';

describe('WorkFlowDetailsReferComponent', () => {
  let component: WorkFlowDetailsReferComponent;
  let fixture: ComponentFixture<WorkFlowDetailsReferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkFlowDetailsReferComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailsReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
