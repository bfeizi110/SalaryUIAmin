import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterGroupFormComponent } from './cost-center-group-form.component';

describe('CostCenterGroupFormComponent', () => {
  let component: CostCenterGroupFormComponent;
  let fixture: ComponentFixture<CostCenterGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
