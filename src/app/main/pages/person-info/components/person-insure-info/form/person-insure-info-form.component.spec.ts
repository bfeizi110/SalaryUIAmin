import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInsureInfoFormComponent } from './person-insure-info-form.component';

describe('PersonInsureInfoFormComponent', () => {
  let component: PersonInsureInfoFormComponent;
  let fixture: ComponentFixture<PersonInsureInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInsureInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInsureInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
