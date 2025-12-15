import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStructureFormComponent } from './org-structure-form.component';

describe('OrgStructureFormComponent', () => {
  let component: OrgStructureFormComponent;
  let fixture: ComponentFixture<OrgStructureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgStructureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgStructureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
