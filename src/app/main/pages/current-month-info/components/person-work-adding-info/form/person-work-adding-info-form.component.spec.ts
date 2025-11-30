import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWorkAddingInfoFormComponent } from './person-work-adding-info-form.component';

describe('PersonWorkAddingInfoFormComponent', () => {
  let component: PersonWorkAddingInfoFormComponent;
  let fixture: ComponentFixture<PersonWorkAddingInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonWorkAddingInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonWorkAddingInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
