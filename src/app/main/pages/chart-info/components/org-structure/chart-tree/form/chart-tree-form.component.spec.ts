import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTreeFormComponent } from './chart-tree-form.component';

describe('ChartTreeFormComponent', () => {
  let component: ChartTreeFormComponent;
  let fixture: ComponentFixture<ChartTreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTreeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
