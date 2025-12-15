import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiBackpayDetailComponent } from './semi-backpay-detail.component';

describe('SemiBackpayDetailComponent', () => {
  let component: SemiBackpayDetailComponent;
  let fixture: ComponentFixture<SemiBackpayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemiBackpayDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiBackpayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
