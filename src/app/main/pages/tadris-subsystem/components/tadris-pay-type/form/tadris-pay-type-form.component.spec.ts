import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisPayTypeFormComponent } from './tadris-pay-type-form.component';

describe('TadrisPayTypeFormComponent', () => {
  let component: TadrisPayTypeFormComponent;
  let fixture: ComponentFixture<TadrisPayTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisPayTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisPayTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
