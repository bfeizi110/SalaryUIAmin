import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCaseInfoComponent } from './person-case-info.component';

describe('PersonCaseInfoComponent', () => {
  let component: PersonCaseInfoComponent;
  let fixture: ComponentFixture<PersonCaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
