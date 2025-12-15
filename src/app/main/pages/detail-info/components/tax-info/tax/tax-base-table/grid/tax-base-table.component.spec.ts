import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseTableComponent } from './tax-base-table.component';

describe('TaxBaseTableComponent', () => {
  let component: TaxBaseTableComponent;
  let fixture: ComponentFixture<TaxBaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
