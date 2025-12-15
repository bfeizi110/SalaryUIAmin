import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeParamFormComponent } from './hire-type-param-form.component';

describe('HireTypeParamFormComponent', () => {
  let component: HireTypeParamFormComponent;
  let fixture: ComponentFixture<HireTypeParamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeParamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeParamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
