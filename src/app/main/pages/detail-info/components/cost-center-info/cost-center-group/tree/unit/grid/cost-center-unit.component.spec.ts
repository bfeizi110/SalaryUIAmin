import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterUnitComponent } from './cost-center-unit.component';

describe('CostCenterUnitComponent', () => {
  let component: CostCenterUnitComponent;
  let fixture: ComponentFixture<CostCenterUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
