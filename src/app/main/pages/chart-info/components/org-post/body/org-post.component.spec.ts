import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPostComponent } from './org-post.component';

describe('OrgPostComponent', () => {
  let component: OrgPostComponent;
  let fixture: ComponentFixture<OrgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
