import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormulaFormComponent } from './new-formula-form.component';

describe('NewFormulaFormComponent', () => {
  let component: NewFormulaFormComponent;
  let fixture: ComponentFixture<NewFormulaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormulaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormulaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
