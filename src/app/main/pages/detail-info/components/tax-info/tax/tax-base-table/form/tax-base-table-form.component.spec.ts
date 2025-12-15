import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseTableFormComponent } from './tax-base-table-form.component';

describe('TaxBaseTableFormComponent', () => {
  let component: TaxBaseTableFormComponent;
  let fixture: ComponentFixture<TaxBaseTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseTableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
