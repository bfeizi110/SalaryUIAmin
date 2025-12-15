import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboDateComponent } from './combo-date.component';

describe('ComboDateComponent', () => {
  let component: ComboDateComponent;
  let fixture: ComponentFixture<ComboDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
