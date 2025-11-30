import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPostFormComponent } from './org-post-form.component';

describe('OrgPostFormComponent', () => {
  let component: OrgPostFormComponent;
  let fixture: ComponentFixture<OrgPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgPostFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
