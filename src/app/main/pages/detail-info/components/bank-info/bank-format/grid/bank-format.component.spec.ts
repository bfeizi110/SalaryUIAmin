import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatComponent } from './bank-format.component';

describe('BankFormatComponent', () => {
  let component: BankFormatComponent;
  let fixture: ComponentFixture<BankFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
