import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisPayComponent } from './tadris-pay.component';

describe('TadrisPayComponent', () => {
  let component: TadrisPayComponent;
  let fixture: ComponentFixture<TadrisPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
