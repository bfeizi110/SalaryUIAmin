import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicShowFormTypeComponent } from './dynamic-showformtype.component';

describe('DynamicShowFormTypeComponent', () => {
  let component: DynamicShowFormTypeComponent;
  let fixture: ComponentFixture<DynamicShowFormTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicShowFormTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicShowFormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
