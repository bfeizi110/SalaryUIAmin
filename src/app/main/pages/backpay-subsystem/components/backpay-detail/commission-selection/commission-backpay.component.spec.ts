import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSelectionComponent } from './commission-selection.component';

describe('CommissionSelectionComponent', () => {
  let component: CommissionSelectionComponent;
  let fixture: ComponentFixture<CommissionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommissionSelectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
