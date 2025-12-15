import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpayIgnoreComponent } from './backpay-ignore.component';

describe('BackpayIgnoreComponent', () => {
  let component: BackpayIgnoreComponent;
  let fixture: ComponentFixture<BackpayIgnoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpayIgnoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpayIgnoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
