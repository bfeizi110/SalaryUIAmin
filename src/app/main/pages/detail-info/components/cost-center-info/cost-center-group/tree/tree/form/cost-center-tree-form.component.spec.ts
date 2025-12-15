import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterTreeFormComponent } from './cost-center-tree-form.component';

describe('CostCenterTreeFormComponent', () => {
  let component: CostCenterTreeFormComponent;
  let fixture: ComponentFixture<CostCenterTreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterTreeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterTreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
