import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayProgramFormComponent } from './pay-program-form.component';

describe('PayProgramFormComponent', () => {
  let component: PayProgramFormComponent;
  let fixture: ComponentFixture<PayProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayProgramFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
