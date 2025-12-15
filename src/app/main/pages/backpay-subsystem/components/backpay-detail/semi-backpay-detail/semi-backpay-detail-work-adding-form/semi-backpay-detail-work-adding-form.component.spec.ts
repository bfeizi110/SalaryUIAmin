import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiBackpayDetailWorkAddingFormComponent } from './semi-backpay-detail-work-adding-form.component';

describe('SemiBackpayDetailWorkAddingFormComponent', () => {
  let component: SemiBackpayDetailWorkAddingFormComponent;
  let fixture: ComponentFixture<SemiBackpayDetailWorkAddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemiBackpayDetailWorkAddingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiBackpayDetailWorkAddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
