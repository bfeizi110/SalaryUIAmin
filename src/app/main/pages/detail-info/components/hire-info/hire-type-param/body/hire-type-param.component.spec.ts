import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeParamComponent } from './hire-type-param.component';

describe('HireTypeParamComponent', () => {
  let component: HireTypeParamComponent;
  let fixture: ComponentFixture<HireTypeParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
