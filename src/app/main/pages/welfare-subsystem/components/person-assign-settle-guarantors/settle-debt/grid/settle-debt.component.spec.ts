import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleDebtComponent } from './settle-debt.component';

describe('SettleDebtComponent', () => {
  let component: SettleDebtComponent;
  let fixture: ComponentFixture<SettleDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettleDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
