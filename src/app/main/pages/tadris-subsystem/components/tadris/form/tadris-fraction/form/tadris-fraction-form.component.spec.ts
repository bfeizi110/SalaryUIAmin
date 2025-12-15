import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisFractionFormComponent } from './tadris-fraction-form.component';

describe('TadrisFractionFormComponent', () => {
  let component: TadrisFractionFormComponent;
  let fixture: ComponentFixture<TadrisFractionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisFractionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisFractionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
