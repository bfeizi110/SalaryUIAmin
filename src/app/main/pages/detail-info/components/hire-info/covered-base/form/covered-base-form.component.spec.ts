import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredBaseFormComponent } from './covered-base-form.component';

describe('CoveredBaseFormComponent', () => {
  let component: CoveredBaseFormComponent;
  let fixture: ComponentFixture<CoveredBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoveredBaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveredBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
