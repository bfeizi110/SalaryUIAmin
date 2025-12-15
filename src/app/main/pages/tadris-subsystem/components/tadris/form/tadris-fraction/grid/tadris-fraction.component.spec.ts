import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisFractionComponent } from './tadris-fraction.component';

describe('TadrisFractionComponent', () => {
  let component: TadrisFractionComponent;
  let fixture: ComponentFixture<TadrisFractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisFractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisFractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
