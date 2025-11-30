import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisFractionTypeFormComponent } from './tadris-fraction-type-form.component';

describe('TadrisFractionTypeFormComponent', () => {
  let component: TadrisFractionTypeFormComponent;
  let fixture: ComponentFixture<TadrisFractionTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisFractionTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisFractionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
