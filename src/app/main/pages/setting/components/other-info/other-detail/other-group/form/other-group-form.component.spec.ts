import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherGroupFormComponent } from './other-group-form.component';

describe('OtherGroupFormComponent', () => {
  let component: OtherGroupFormComponent;
  let fixture: ComponentFixture<OtherGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
