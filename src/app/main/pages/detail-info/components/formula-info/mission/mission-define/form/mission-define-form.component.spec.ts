import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDefineFormComponent } from './mission-define-form.component';

describe('MissionDefineFormComponent', () => {
  let component: MissionDefineFormComponent;
  let fixture: ComponentFixture<MissionDefineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionDefineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDefineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
