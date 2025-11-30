import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterGroupComponent } from './cost-center-group.component';

describe('CostCenterGroupComponent', () => {
  let component: CostCenterGroupComponent;
  let fixture: ComponentFixture<CostCenterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
