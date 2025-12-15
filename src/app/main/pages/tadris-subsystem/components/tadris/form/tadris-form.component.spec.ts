import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TadrisFormComponent } from './tadris-form.component';

describe('TadrisFormComponent', () => {
  let component: TadrisFormComponent;
  let fixture: ComponentFixture<TadrisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TadrisFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TadrisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
