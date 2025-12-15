import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMostamarInfoFormComponent } from './person-mostamar-info-form.component';

describe('PersonMostamarInfoFormComponent', () => {
  let component: PersonMostamarInfoFormComponent;
  let fixture: ComponentFixture<PersonMostamarInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMostamarInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMostamarInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
