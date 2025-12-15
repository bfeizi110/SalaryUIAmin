import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssignSavingFormComponent } from './person-assign-saving-form.component';

describe('PersonAssignSavingFormComponent', () => {
  let component: PersonAssignSavingFormComponent;
  let fixture: ComponentFixture<PersonAssignSavingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAssignSavingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssignSavingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
