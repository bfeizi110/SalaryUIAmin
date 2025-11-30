import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterUnitFormComponent } from './cost-center-unit-form.component';

describe('CostCenterUnitFormComponent', () => {
  let component: CostCenterUnitFormComponent;
  let fixture: ComponentFixture<CostCenterUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterUnitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
