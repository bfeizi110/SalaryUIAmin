import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureFormComponent } from './insure-form.component';

describe('InsureFormComponent', () => {
  let component: InsureFormComponent;
  let fixture: ComponentFixture<InsureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
