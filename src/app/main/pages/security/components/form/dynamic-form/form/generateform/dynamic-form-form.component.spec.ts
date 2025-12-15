import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormFormComponent } from './dynamic-form-form.component';

describe('EntityPropertyFormComponent', () => {
  let component: DynamicFormFormComponent;
  let fixture: ComponentFixture<DynamicFormFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
