import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherGroupComponent } from './other-group.component';

describe('OtherGroupComponent', () => {
  let component: OtherGroupComponent;
  let fixture: ComponentFixture<OtherGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
