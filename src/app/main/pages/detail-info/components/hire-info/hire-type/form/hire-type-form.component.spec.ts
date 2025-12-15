import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeFormComponent } from './hire-type-form.component';

describe('HireTypeFormComponent', () => {
  let component: HireTypeFormComponent;
  let fixture: ComponentFixture<HireTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
