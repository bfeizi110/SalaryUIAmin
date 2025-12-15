import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChildFormComponent } from './history-child-form.component';

describe('HistoryChildFormComponent', () => {
  let component: HistoryChildFormComponent;
  let fixture: ComponentFixture<HistoryChildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryChildFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
