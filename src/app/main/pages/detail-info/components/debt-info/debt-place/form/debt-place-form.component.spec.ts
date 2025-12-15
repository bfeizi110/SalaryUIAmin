import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPlaceFormComponent } from './debt-place-form.component';

describe('DebtPlaceFormComponent', () => {
  let component: DebtPlaceFormComponent;
  let fixture: ComponentFixture<DebtPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtPlaceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtPlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
