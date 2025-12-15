import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWorkAddingInfoComponent } from './person-work-adding-info.component';

describe('PersonWorkAddingInfoComponent', () => {
  let component: PersonWorkAddingInfoComponent;
  let fixture: ComponentFixture<PersonWorkAddingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonWorkAddingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonWorkAddingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
