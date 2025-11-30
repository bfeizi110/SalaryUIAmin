import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTypeComponent } from './hire-type.component';

describe('HireTypeComponent', () => {
  let component: HireTypeComponent;
  let fixture: ComponentFixture<HireTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
