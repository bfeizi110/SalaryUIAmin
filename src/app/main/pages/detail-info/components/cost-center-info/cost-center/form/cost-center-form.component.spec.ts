import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterFormComponent } from './cost-center-form.component';

describe('CostCenterFormComponent', () => {
  let component: CostCenterFormComponent;
  let fixture: ComponentFixture<CostCenterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
