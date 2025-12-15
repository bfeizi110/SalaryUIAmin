import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredBaseComponent } from './covered-base.component';

describe('CoveredBaseComponent', () => {
  let component: CoveredBaseComponent;
  let fixture: ComponentFixture<CoveredBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoveredBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveredBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
