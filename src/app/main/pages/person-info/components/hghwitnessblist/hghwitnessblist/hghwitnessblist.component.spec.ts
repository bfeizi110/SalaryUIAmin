import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HghWitnessBListComponent } from './hghwitnessblist.component';

describe('HghWitnessBListComponent', () => {
  let component: HghWitnessBListComponent;
  let fixture: ComponentFixture<HghWitnessBListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HghWitnessBListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HghWitnessBListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
