import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPayInfoComponent } from './person-pay-info.component';

describe('PersonPayInfoComponent', () => {
  let component: PersonPayInfoComponent;
  let fixture: ComponentFixture<PersonPayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonPayInfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
