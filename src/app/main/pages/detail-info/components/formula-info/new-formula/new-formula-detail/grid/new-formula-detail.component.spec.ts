import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormulaDetailComponent } from './new-formula-detail.component';

describe('NewFormulaDetailComponent', () => {
  let component: NewFormulaDetailComponent;
  let fixture: ComponentFixture<NewFormulaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormulaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormulaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
