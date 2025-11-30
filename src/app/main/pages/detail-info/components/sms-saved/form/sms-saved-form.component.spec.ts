import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSavedFormComponent } from './sms-saved-form.component';

describe('SmsSavedFormComponent', () => {
  let component: SmsSavedFormComponent;
  let fixture: ComponentFixture<SmsSavedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSavedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
