import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBaseFormComponent } from './tax-base-form.component';

describe('TaxBaseFormComponent', () => {
  let component: TaxBaseFormComponent;
  let fixture: ComponentFixture<TaxBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxBaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
