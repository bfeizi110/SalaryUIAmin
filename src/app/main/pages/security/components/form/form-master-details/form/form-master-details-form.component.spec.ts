import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMasterDetailsFormComponent } from './form-master-details-form.component';

describe('EntityPropertyFormComponent', () => {
  let component: FormMasterDetailsFormComponent;
  let fixture: ComponentFixture<FormMasterDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMasterDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMasterDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
