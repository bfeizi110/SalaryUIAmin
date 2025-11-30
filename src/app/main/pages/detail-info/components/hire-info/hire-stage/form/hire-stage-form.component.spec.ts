import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireStageFormComponent } from './hire-stage-form.component';

describe('HireStageFormComponent', () => {
  let component: HireStageFormComponent;
  let fixture: ComponentFixture<HireStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireStageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
