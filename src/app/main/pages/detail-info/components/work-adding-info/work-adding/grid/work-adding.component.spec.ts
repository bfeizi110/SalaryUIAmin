import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddingComponent } from './work-adding.component';

describe('WorkAddingComponent', () => {
  let component: WorkAddingComponent;
  let fixture: ComponentFixture<WorkAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
