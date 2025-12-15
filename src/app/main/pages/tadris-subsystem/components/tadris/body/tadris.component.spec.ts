import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisComponent } from './tadris.component';

describe('TadrisComponent', () => {
  let component: TadrisComponent;
  let fixture: ComponentFixture<TadrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
