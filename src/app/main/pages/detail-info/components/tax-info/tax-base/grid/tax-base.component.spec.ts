import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseComponent } from './tax-base.component';

describe('TaxBaseComponent', () => {
  let component: TaxBaseComponent;
  let fixture: ComponentFixture<TaxBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
