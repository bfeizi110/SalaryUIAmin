import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMasterDetailsComponent } from './form-master-details.component';

describe('FormMasterDetailsComponent', () => {
  let component: FormMasterDetailsComponent;
  let fixture: ComponentFixture<FormMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
