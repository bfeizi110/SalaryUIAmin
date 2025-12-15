import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailsFormComponent } from './workflow-details-form.component';

describe('WorkFlowDetailsFormComponent', () => {
  let component: WorkFlowDetailsFormComponent;
  let fixture: ComponentFixture<WorkFlowDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
