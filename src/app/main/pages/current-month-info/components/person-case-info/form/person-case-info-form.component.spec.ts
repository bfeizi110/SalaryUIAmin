import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCaseInfoFormComponent } from './person-case-info-form.component';

describe('PersonCaseInfoFormComponent', () => {
  let component: PersonCaseInfoFormComponent;
  let fixture: ComponentFixture<PersonCaseInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCaseInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCaseInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
