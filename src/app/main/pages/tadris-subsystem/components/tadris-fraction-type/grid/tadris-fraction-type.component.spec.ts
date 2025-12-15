import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisFractionTypeComponent } from './tadris-fraction-type.component';

describe('TadrisFractionTypeComponent', () => {
  let component: TadrisFractionTypeComponent;
  let fixture: ComponentFixture<TadrisFractionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisFractionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisFractionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
