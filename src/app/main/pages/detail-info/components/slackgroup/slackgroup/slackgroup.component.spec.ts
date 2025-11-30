import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackGroupComponent } from './slackgroup.component';

describe('ListNoComponent', () => {
  let component: SlackGroupComponent;
  let fixture: ComponentFixture<SlackGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
