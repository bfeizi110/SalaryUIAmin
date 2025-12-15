import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCostCenter2Component } from './person-cost-center2.component';

describe('PersonCostCenter2Component', () => {
  let component: PersonCostCenter2Component;
  let fixture: ComponentFixture<PersonCostCenter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCostCenter2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCostCenter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
