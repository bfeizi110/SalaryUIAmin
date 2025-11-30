import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionStateFormComponent } from './commission-state-form.component';

describe('CommissionStateFormComponent', () => {
  let component: CommissionStateFormComponent;
  let fixture: ComponentFixture<CommissionStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionStateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
