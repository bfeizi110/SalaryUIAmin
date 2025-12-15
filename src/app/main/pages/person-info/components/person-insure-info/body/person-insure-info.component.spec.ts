import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInsureInfoComponent } from './person-insure-info.component';

describe('PersonInsureInfoComponent', () => {
  let component: PersonInsureInfoComponent;
  let fixture: ComponentFixture<PersonInsureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInsureInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInsureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
