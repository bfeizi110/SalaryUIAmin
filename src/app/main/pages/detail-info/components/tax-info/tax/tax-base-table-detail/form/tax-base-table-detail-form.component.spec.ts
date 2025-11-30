import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseTableDetailFormComponent } from './tax-base-table-detail-form.component';

describe('TaxBaseTableDetailFormComponent', () => {
  let component: TaxBaseTableDetailFormComponent;
  let fixture: ComponentFixture<TaxBaseTableDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseTableDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseTableDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
