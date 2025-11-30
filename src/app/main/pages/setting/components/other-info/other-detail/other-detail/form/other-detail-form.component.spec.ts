import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDetailFormComponent } from './other-detail-form.component';

describe('OtherDetailFormComponent', () => {
  let component: OtherDetailFormComponent;
  let fixture: ComponentFixture<OtherDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
