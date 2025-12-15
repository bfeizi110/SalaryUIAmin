import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDynamicFormComponent } from './show-dynamic-form.component';

describe('DynamicFormType1Component', () => {
  let component: ShowDynamicFormComponent;
  let fixture: ComponentFixture<ShowDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
