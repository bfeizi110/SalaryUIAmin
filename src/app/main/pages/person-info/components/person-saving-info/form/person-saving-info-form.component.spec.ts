import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSavingInfoFormComponent } from './person-saving-info-form.component';

describe('PersonSavingInfoFormComponent', () => {
  let component: PersonSavingInfoFormComponent;
  let fixture: ComponentFixture<PersonSavingInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonSavingInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSavingInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
