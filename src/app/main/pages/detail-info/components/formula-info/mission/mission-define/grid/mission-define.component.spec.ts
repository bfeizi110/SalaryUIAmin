import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDefineComponent } from './mission-define.component';

describe('MissionDefineComponent', () => {
  let component: MissionDefineComponent;
  let fixture: ComponentFixture<MissionDefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionDefineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
