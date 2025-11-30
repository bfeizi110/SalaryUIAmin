import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseSavingComponent } from './increase-saving.component';

describe('IncreaseSavingComponent', () => {
  let component: IncreaseSavingComponent;
  let fixture: ComponentFixture<IncreaseSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncreaseSavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
