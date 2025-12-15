import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSavingInfoComponent } from './person-saving-info.component';

describe('PersonSavingInfoComponent', () => {
  let component: PersonSavingInfoComponent;
  let fixture: ComponentFixture<PersonSavingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonSavingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSavingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
