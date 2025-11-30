import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccessFormComponent } from './group-access-form.component';

describe('GroupAccessFormComponent', () => {
  let component: GroupAccessFormComponent;
  let fixture: ComponentFixture<GroupAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAccessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
