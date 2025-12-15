import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisPayTypeComponent } from './tadris-pay-type.component';

describe('TadrisPayTypeComponent', () => {
  let component: TadrisPayTypeComponent;
  let fixture: ComponentFixture<TadrisPayTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisPayTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisPayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
