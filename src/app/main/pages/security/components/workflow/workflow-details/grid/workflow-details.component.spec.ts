import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailsComponent } from './workflow-details.component';

describe('WorkFlowDetailsComponent', () => {
  let component: WorkFlowDetailsComponent;
  let fixture: ComponentFixture<WorkFlowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkFlowDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
