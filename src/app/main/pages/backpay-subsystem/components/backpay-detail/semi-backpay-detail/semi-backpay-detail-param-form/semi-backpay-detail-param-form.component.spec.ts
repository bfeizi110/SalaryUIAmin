import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiBackpayDetailParamFormComponent } from './semi-backpay-detail-param-form.component';

describe('SemiBackpayDetailParamFormComponent', () => {
  let component: SemiBackpayDetailParamFormComponent;
  let fixture: ComponentFixture<SemiBackpayDetailParamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemiBackpayDetailParamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiBackpayDetailParamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
