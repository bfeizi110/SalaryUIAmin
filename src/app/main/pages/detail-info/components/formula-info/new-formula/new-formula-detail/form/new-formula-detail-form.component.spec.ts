import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormulaDetailFormComponent } from './new-formula-detail-form.component';

describe('NewFormulaDetailFormComponent', () => {
  let component: NewFormulaDetailFormComponent;
  let fixture: ComponentFixture<NewFormulaDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormulaDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormulaDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
