import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireStateFormComponent } from './hire-state-form.component';

describe('HireStateFormComponent', () => {
  let component: HireStateFormComponent;
  let fixture: ComponentFixture<HireStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireStateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
