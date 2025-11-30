import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPlaceComponent } from './debt-place.component';

describe('DebtPlaceComponent', () => {
  let component: DebtPlaceComponent;
  let fixture: ComponentFixture<DebtPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
