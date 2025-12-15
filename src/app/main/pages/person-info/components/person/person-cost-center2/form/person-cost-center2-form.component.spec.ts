import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCostCenter2FormComponent } from './person-cost-center2-form.component';

describe('PersonCostCenter2FormComponent', () => {
  let component: PersonCostCenter2FormComponent;
  let fixture: ComponentFixture<PersonCostCenter2FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCostCenter2FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCostCenter2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
