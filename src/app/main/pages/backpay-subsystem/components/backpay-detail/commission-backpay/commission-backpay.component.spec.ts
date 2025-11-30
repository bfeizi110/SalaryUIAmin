import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionBackpayComponent } from './commission-backpay.component';

describe('CommissionBackpayComponent', () => {
  let component: CommissionBackpayComponent;
  let fixture: ComponentFixture<CommissionBackpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionBackpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionBackpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
