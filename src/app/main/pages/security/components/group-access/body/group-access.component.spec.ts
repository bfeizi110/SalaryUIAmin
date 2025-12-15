import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccessComponent } from './group-access.component';

describe('GroupAccessComponent', () => {
  let component: GroupAccessComponent;
  let fixture: ComponentFixture<GroupAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
