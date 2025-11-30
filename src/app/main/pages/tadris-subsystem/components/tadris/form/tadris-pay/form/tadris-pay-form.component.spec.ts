import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisPayFormComponent } from './tadris-pay-form.component';

describe('TadrisPayFormComponent', () => {
  let component: TadrisPayFormComponent;
  let fixture: ComponentFixture<TadrisPayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisPayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisPayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
