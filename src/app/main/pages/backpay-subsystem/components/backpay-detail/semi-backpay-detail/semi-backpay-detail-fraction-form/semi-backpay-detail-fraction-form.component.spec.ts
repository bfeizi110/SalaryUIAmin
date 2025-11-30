import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiBackpayDetailFractionFormComponent } from './semi-backpay-detail-fraction-form.component';

describe('SemiBackpayDetailFractionFormComponent', () => {
  let component: SemiBackpayDetailFractionFormComponent;
  let fixture: ComponentFixture<SemiBackpayDetailFractionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemiBackpayDetailFractionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiBackpayDetailFractionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
