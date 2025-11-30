import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayProgramComponent } from './pay-program.component';

describe('PayProgramComponent', () => {
  let component: PayProgramComponent;
  let fixture: ComponentFixture<PayProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
