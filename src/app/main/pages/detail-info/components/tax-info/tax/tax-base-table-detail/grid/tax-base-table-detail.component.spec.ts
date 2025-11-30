import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseTableDetailComponent } from './tax-base-table-detail.component';

describe('TaxBaseTableDetailComponent', () => {
  let component: TaxBaseTableDetailComponent;
  let fixture: ComponentFixture<TaxBaseTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseTableDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
