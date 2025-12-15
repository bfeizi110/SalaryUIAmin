import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddingFormComponent } from './work-adding-form.component';

describe('WorkAddingFormComponent', () => {
  let component: WorkAddingFormComponent;
  let fixture: ComponentFixture<WorkAddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
