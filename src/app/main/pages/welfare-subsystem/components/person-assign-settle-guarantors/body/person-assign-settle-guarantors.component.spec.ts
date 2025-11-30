import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssignSettleGuarantorsComponent } from './person-assign-settle-guarantors.component';

describe('PersonAssignSettleGuarantorsComponent', () => {
  let component: PersonAssignSettleGuarantorsComponent;
  let fixture: ComponentFixture<PersonAssignSettleGuarantorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAssignSettleGuarantorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssignSettleGuarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
