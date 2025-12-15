import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseSavingFormComponent } from './increase-saving-form.component';

describe('IncreaseSavingFormComponent', () => {
  let component: IncreaseSavingFormComponent;
  let fixture: ComponentFixture<IncreaseSavingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaseSavingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseSavingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
