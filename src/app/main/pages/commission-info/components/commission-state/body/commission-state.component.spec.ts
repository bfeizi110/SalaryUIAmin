import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionStateComponent } from './commission-state.component';

describe('CommissionStateComponent', () => {
  let component: CommissionStateComponent;
  let fixture: ComponentFixture<CommissionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
