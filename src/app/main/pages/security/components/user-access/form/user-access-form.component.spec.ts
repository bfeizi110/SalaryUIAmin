import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessFormComponent } from './user-access-form.component';

describe('UserAccessFormComponent', () => {
  let component: UserAccessFormComponent;
  let fixture: ComponentFixture<UserAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
