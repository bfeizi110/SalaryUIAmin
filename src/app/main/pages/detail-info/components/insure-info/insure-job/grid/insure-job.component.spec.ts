import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureJobComponent } from './insure-job.component';

describe('InsureJobComponent', () => {
  let component: InsureJobComponent;
  let fixture: ComponentFixture<InsureJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsureJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
