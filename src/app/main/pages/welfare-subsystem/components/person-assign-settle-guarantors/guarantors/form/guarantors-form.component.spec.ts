import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorsFormComponent } from './guarantors-form.component';

describe('GuarantorsFormComponent', () => {
  let component: GuarantorsFormComponent;
  let fixture: ComponentFixture<GuarantorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuarantorsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
