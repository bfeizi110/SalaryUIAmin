import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddingDefineComponent } from './work-adding-define.component';

describe('WorkAddingDefineComponent', () => {
  let component: WorkAddingDefineComponent;
  let fixture: ComponentFixture<WorkAddingDefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddingDefineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAddingDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
