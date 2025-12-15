import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChildComponent } from './history-child.component';

describe('HistoryChildComponent', () => {
  let component: HistoryChildComponent;
  let fixture: ComponentFixture<HistoryChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
