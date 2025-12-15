import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfThePastSituationComponent } from './summary-of-the-past-situation.component';

describe('SummaryOfThePastSituationComponent', () => {
  let component: SummaryOfThePastSituationComponent;
  let fixture: ComponentFixture<SummaryOfThePastSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOfThePastSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOfThePastSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
