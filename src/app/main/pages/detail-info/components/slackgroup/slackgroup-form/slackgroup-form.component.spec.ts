import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackGroupFormComponent } from './slackgroup-form.component';

describe('ListNoFormComponent', () => {
  let component: SlackGroupFormComponent;
  let fixture: ComponentFixture<SlackGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
