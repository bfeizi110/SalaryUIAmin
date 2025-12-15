import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUserAccessComponent } from './filter-user-access.component';

describe('FilterUserAccessComponent', () => {
  let component: FilterUserAccessComponent;
  let fixture: ComponentFixture<FilterUserAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterUserAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
