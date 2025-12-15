import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSavedComponent } from './sms-saved.component';

describe('SmsSavedComponent', () => {
  let component: SmsSavedComponent;
  let fixture: ComponentFixture<SmsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
