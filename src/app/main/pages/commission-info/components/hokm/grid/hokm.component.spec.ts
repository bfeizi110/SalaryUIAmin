import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HokmComponent } from './hokm.component';

describe('HokmComponent', () => {
  let component: HokmComponent;
  let fixture: ComponentFixture<HokmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HokmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HokmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
