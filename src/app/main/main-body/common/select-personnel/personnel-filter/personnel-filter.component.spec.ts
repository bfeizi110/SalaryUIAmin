import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelFilterComponent } from './personnel-filter.component';

describe('PersonnelFilterComponent', () => {
  let component: PersonnelFilterComponent;
  let fixture: ComponentFixture<PersonnelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
