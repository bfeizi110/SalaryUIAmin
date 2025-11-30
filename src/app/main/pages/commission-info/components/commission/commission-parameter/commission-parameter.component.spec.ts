import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionParameterComponent } from './commission-parameter.component';

describe('CommissionParameterComponent', () => {
  let component: CommissionParameterComponent;
  let fixture: ComponentFixture<CommissionParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
