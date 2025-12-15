import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HokmFormComponent } from './hokm-form.component';

describe('HokmFormComponent', () => {
  let component: HokmFormComponent;
  let fixture: ComponentFixture<HokmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HokmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HokmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
