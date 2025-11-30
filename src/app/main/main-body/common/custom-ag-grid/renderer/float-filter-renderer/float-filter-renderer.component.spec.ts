import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatFilterRendererComponent } from './float-filter-renderer.component';

describe('FloatFilterRendererComponent', () => {
  let component: FloatFilterRendererComponent;
  let fixture: ComponentFixture<FloatFilterRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatFilterRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatFilterRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
