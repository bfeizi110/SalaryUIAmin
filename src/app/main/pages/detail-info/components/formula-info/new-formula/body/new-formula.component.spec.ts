import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormulaComponent } from './new-formula.component';

describe('NewFormulaComponent', () => {
  let component: NewFormulaComponent;
  let fixture: ComponentFixture<NewFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
