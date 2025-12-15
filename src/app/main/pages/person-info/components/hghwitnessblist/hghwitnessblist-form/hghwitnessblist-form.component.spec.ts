import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghWitnessBListFormComponent } from './hghwitnessblist-form.component';

describe('HghWitnessBListFormComponent', () => {
  let component: HghWitnessBListFormComponent;
  let fixture: ComponentFixture<HghWitnessBListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghWitnessBListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghWitnessBListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
