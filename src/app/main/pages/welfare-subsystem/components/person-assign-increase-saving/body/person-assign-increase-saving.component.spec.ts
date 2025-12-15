import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssignIncreaseSavingComponent } from './person-assign-increase-saving.component';

describe('PersonAssignIncreaseSavingComponent', () => {
  let component: PersonAssignIncreaseSavingComponent;
  let fixture: ComponentFixture<PersonAssignIncreaseSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAssignIncreaseSavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssignIncreaseSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
