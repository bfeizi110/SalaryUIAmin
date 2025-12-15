import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormType1Component } from './dynamic-form-type1.component';

describe('DynamicFormType1Component', () => {
  let component: DynamicFormType1Component;
  let fixture: ComponentFixture<DynamicFormType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormType1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
