import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMostamarInfoComponent } from './person-mostamar-info.component';

describe('PersonMostamarInfoComponent', () => {
  let component: PersonMostamarInfoComponent;
  let fixture: ComponentFixture<PersonMostamarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMostamarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMostamarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
