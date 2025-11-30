import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpayIgnoreFormComponent } from './backpay-ignore-form.component';

describe('BackpayIgnoreFormComponent', () => {
  let component: BackpayIgnoreFormComponent;
  let fixture: ComponentFixture<BackpayIgnoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpayIgnoreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackpayIgnoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
