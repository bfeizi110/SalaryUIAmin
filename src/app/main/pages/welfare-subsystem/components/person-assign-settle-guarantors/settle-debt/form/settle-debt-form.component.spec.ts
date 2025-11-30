import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleDebtFormComponent } from './settle-debt-form.component';

describe('SettleDebtFormComponent', () => {
  let component: SettleDebtFormComponent;
  let fixture: ComponentFixture<SettleDebtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettleDebtFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleDebtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
