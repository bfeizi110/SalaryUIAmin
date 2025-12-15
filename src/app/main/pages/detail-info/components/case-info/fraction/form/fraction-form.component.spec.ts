import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionFormComponent } from './fraction-form.component';

describe('FractionFormComponent', () => {
  let component: FractionFormComponent;
  let fixture: ComponentFixture<FractionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FractionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
