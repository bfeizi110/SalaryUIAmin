import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFormatFormComponent } from './bank-format-form.component';

describe('BankFormatFormComponent', () => {
  let component: BankFormatFormComponent;
  let fixture: ComponentFixture<BankFormatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFormatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFormatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
