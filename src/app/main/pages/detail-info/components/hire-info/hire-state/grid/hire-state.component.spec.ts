import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireStateComponent } from './hire-state.component';

describe('HireStateComponent', () => {
  let component: HireStateComponent;
  let fixture: ComponentFixture<HireStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
