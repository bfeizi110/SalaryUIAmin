import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBranchFormComponent } from './bank-branch-form.component';

describe('BankBranchFormComponent', () => {
  let component: BankBranchFormComponent;
  let fixture: ComponentFixture<BankBranchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankBranchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
