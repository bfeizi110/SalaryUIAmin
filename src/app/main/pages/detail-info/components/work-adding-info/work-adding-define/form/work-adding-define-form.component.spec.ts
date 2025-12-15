import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddingDefineFormComponent } from './work-adding-define-form.component';

describe('WorkAddingDefineFormComponent', () => {
  let component: WorkAddingDefineFormComponent;
  let fixture: ComponentFixture<WorkAddingDefineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddingDefineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAddingDefineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
