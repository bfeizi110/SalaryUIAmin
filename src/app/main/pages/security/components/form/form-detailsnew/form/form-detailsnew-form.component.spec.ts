import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailsFormComponent } from './form-details-form.component';

describe('EntityPropertyFormComponent', () => {
  let component: FormDetailsFormComponent;
  let fixture: ComponentFixture<FormDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
